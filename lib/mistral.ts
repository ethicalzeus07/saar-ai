import dotenv from "dotenv";
dotenv.config();
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

// Add typed helper to ensure we never exceed Vercel 10s function limit
function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 9000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
}

export async function generateSummaryFromMistral(pdfText: string): Promise<string> {
  // Try Groq first (primary provider)
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      const groqRes = await fetchWithTimeout("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SUMMARY_SYSTEM_PROMPT },
            {
              role: "user",
              content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      }, 9000);

      if (groqRes.status === 429) {
        throw new Error("RATE_LIMIT_EXCEEDED");
      }
      if (groqRes.ok) {
        const groqData = await groqRes.json();
        return groqData.choices[0].message.content as string;
      }

      // If Groq responded with an error status, log and continue to fallback.
      const groqText = await groqRes.text();
      console.warn(`Groq API error ${groqRes.status}: ${groqText} – falling back to Mistral`);
    } catch (err) {
      // Any fetch/parsing error falls through to fallback provider
      console.warn("Groq provider failed, falling back to Mistral:", err);
    }
  }

  // --- Fallback to Mistral ---
  const mistralKey = process.env.MISTRAL_API_KEY;
  if (!mistralKey) {
    throw new Error("Neither GROQ_API_KEY nor MISTRAL_API_KEY is set in .env");
  }

  try {
    const res = await fetchWithTimeout("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${mistralKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral-medium-2505",
        messages: [
          { role: "system", content: SUMMARY_SYSTEM_PROMPT },
          {
            role: "user",
            content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    }, 27000);

    if (res.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Mistral API error ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data.choices[0].message.content as string;
  } catch (err) {
    // Propagate any errors from the fallback provider
    throw err;
  }
}
