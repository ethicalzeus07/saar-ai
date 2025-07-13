import dotenv from "dotenv";
dotenv.config();
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

export async function generateSummaryFromMistral(pdfText: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY not set in .env");
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SUMMARY_SYSTEM_PROMPT },
          { role: "user",   content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}` },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    // mirror your OpenAI-style rate-limit error
    if (res.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Groq API error ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data.choices[0].message.content as string;
  } catch (err) {
    // bubble up other errors unchanged
    throw err;
  }
}
