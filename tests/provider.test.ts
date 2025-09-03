import { runWithProvider } from '../lib/providers';

test('provider stub echoes prompt (demo mode)', async () => {
  const out = await runWithProvider({ provider: 'openai', prompt: 'hello world' });
  expect(typeof out).toBe('string');
  expect(out.toLowerCase()).toContain('hello world');
});
import { openaiProvider } from '../lib/providers/openai';

test('openaiProvider returns stubbed/demo response without keys', async () => {
  const out = await openaiProvider('Say hi');
  expect(out.toLowerCase()).toContain('demo mode');
});
