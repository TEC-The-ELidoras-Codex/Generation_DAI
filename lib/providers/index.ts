import { openaiProvider } from './openai';

type ProviderFunction = (prompt: string, context?: unknown) => Promise<string>;

const providers: Record<string, ProviderFunction> = {
  openai: openaiProvider,
};

export async function runWithProvider(
  providerName: string,
  prompt: string,
  context?: unknown
): Promise<string> {
  const provider = providers[providerName];
  
  if (!provider) {
    throw new Error(`Unknown provider: ${providerName}`);
  }

  return provider(prompt, context);
}