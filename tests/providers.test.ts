import { describe, it, expect } from 'vitest';
import { runWithProvider } from '../lib/providers';

describe('Provider Index', () => {
  it('should route to openai provider', async () => {
    // Since no API keys are set by default, this should return demo text
    const result = await runWithProvider('openai', 'Test prompt');
    
    expect(result).toContain('Demo response for prompt');
    expect(result).toContain('Test prompt');
  });

  it('should throw error for unknown provider', async () => {
    await expect(runWithProvider('unknown', 'Test prompt')).rejects.toThrow('Unknown provider: unknown');
  });

  it('should pass context to provider', async () => {
    const context = { test: 'data' };
    const result = await runWithProvider('openai', 'Test prompt', context);
    
    expect(result).toContain('Context provided: Yes');
  });
});