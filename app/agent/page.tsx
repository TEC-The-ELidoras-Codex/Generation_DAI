"use client";
import { useState } from 'react';

export default function AgentConsole() {
  const [prompt, setPrompt] = useState('Say hello as a caring reading coach.');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'openai', prompt })
      });
      const data = await res.json();
      setOutput(data.output ?? data.error ?? 'No output');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-4 max-w-2xl">
      <h2 className="text-2xl font-bold">Agent Console</h2>
      <div className="space-y-1">
        <label htmlFor="prompt" className="text-sm text-white/70">Prompt</label>
        <textarea
          id="prompt"
          placeholder="Type your instruction or question..."
          className="w-full h-40 rounded bg-white/5 border border-white/10 p-2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={run}
          disabled={loading}
          className="px-3 py-1 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-50"
        >
          {loading ? 'Running…' : 'Run'}
        </button>
        <a className="text-sm" href="/">Back</a>
      </div>
      {output && (
        <pre className="whitespace-pre-wrap rounded bg-black/40 border border-white/10 p-3 text-white/90">
          {output}
        </pre>
      )}
    </section>
  );
}
