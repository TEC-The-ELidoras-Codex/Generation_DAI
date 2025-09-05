import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { openaiProvider } from '../lib/providers/openai';

describe('OpenAI Provider', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return demo text when no API keys are configured', async () => {
    // Clear all API key environment variables
    delete process.env.OPENAI_API_KEY;
    delete process.env.AZURE_OPENAI_ENDPOINT;
    delete process.env.AZURE_OPENAI_API_KEY;

    const prompt = 'Say hello as a caring reading coach.';
    const result = await openaiProvider(prompt);

    expect(result).toContain('Demo response for prompt');
    expect(result).toContain('Say hello as a caring reading coach.');
    expect(result).toContain('no API keys are configured');
    expect(result).toContain('Context provided: No');
  });

  it('should include context info in demo response when context is provided', async () => {
    // Clear all API key environment variables
    delete process.env.OPENAI_API_KEY;
    delete process.env.AZURE_OPENAI_ENDPOINT;
    delete process.env.AZURE_OPENAI_API_KEY;

    const prompt = 'Help with math';
    const context = { topic: 'fractions' };
    const result = await openaiProvider(prompt, context);

    expect(result).toContain('Demo response for prompt');
    expect(result).toContain('Context provided: Yes');
  });

  it('should truncate long prompts in demo response', async () => {
    // Clear all API key environment variables
    delete process.env.OPENAI_API_KEY;
    delete process.env.AZURE_OPENAI_ENDPOINT;
    delete process.env.AZURE_OPENAI_API_KEY;

    const longPrompt = 'This is a very long prompt that should be truncated in the demo response because it exceeds fifty characters';
    const result = await openaiProvider(longPrompt);

    expect(result).toContain('This is a very long prompt that should be truncate...');
    expect(result).not.toContain('exceeds fifty characters');
  });

  it('should attempt to call OpenAI API when OPENAI_API_KEY is set', async () => {
    process.env.OPENAI_API_KEY = 'test-key';
    delete process.env.AZURE_OPENAI_ENDPOINT;
    delete process.env.AZURE_OPENAI_API_KEY;

    const prompt = 'Test prompt';
    
    // This will fail because it's not a real API key, but we can test that it tries
    await expect(openaiProvider(prompt)).rejects.toThrow('Failed to get response from AI provider');
  });

  it('should attempt to call Azure OpenAI when Azure credentials are set', async () => {
    delete process.env.OPENAI_API_KEY;
    process.env.AZURE_OPENAI_ENDPOINT = 'https://test.openai.azure.com';
    process.env.AZURE_OPENAI_API_KEY = 'test-azure-key';

    const prompt = 'Test prompt';
    
    // This will fail because it's not a real endpoint, but we can test that it tries
    await expect(openaiProvider(prompt)).rejects.toThrow('Failed to get response from AI provider');
  });
});