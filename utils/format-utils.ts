export function formatFileNameAsTitle(fileName: string): string {
    // Remove file extension and replace special characters with spaces
    const withoutExtension = fileName.replace(/\.[^.]+$/, '');
    const withSpaces = withoutExtension
      .replace(/[-_]+/g, ' ') // Replace dashes and underscores with spaces
      .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between camelCase
  
    // Convert to title case (capitalize first letter of each word)
    return withSpaces
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
  }

export function sanitizeSummary(text: string, maxPoints = 5): string {
  // Remove leading/trailing whitespace
  text = text.trim();
  // Remove ```markdown or ``` at the start and end
  if (text.startsWith("```markdown")) {
    text = text.replace(/^```markdown\s*/, "");
  } else if (text.startsWith("```")) {
    text = text.replace(/^```\s*/, "");
  }
  if (text.endsWith("```")) {
    text = text.replace(/```$/, "");
  }
  text = text.trim();

  // Limit bullet points to maxPoints per section (by heading)
  const lines = text.split("\n");
  let bulletCount = 0;
  let inSection = false;
  return lines.filter(line => {
    if (/^#+\s/.test(line)) {
      // New section, reset bullet count
      bulletCount = 0;
      inSection = true;
      return true;
    }
    if (/^\s*[-*]\s+/.test(line) && inSection) {
      bulletCount++;
      if (bulletCount > maxPoints) return false;
      return true;
    }
    return true; // Keep non-bullet lines
  }).join("\n");
} 