import { NextRequest, NextResponse } from 'next/server';
import { runWithProvider } from '@/lib/providers';

export async function POST(req: NextRequest) {
  try {
    const { provider, prompt, context } = await req.json();
    if (typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
    }
    const output = await runWithProvider({ provider, prompt, context });
    return NextResponse.json({ output });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unexpected error' }, { status: 500 });
  }
}
