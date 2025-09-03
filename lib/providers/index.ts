import { openaiProvider } from './openai';

type RunInput = {
  provider?: string;
  prompt: string;
  context?: unknown;
};

export async function runWithProvider({ provider = 'openai', prompt, context }: RunInput) {
  switch (provider) {
    case 'openai':
      return openaiProvider(prompt, context);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
