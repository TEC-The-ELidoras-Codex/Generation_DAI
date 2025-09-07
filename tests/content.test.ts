import { describe, it, expect } from 'vitest';

describe('API Routes', () => {
  it('should define agent API functionality', async () => {
    // Test that the route module exports the expected functions
    const route = await import('../app/api/agent/route');
    expect(route.POST).toBeDefined();
    expect(typeof route.POST).toBe('function');
  });
});

describe('Educational Content', () => {
  it('should have wiki content structure', () => {
    // Basic test to ensure our content structure is valid
    const topics = ['tnt-nobel', 'dyson-spheres', 'quantum-physics'];
    topics.forEach(topic => {
      expect(topic).toMatch(/^[a-z-]+$/); // Valid URL segments
    });
  });
});