import { NextRequest, NextResponse } from 'next/server';
import { runWithProvider } from '@/lib/providers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Input validation
    if (!body.prompt || typeof body.prompt !== 'string' || body.prompt.trim() === '') {
      return NextResponse.json(
        { error: 'Prompt is required and cannot be empty' },
        { status: 400 }
      );
    }

    const { provider = 'openai', prompt, context } = body;

    const output = await runWithProvider(provider, prompt, context);

    return NextResponse.json({ output });
  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}