export async function openaiProvider(prompt: string, _context?: unknown): Promise<string> {
  // Placeholder: wire up OpenAI/Azure OpenAI here. For now, echo a formatted response.
  const key = process.env.OPENAI_API_KEY || process.env.AZURE_OPENAI_API_KEY;
  if (!key) {
    return `Demo mode: received prompt: "${prompt.slice(0, 200)}"...`;
  }
  // TODO: Implement actual call using OpenAI/Azure SDK based on available envs.
  return `Stubbed response for: ${prompt.slice(0, 200)}`;
}
