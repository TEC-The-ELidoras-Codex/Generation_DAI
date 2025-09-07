import { NextRequest, NextResponse } from 'next/server';

// Stub providers - will use OpenAI if API key is set
const providers = {
  openai: async (prompt: string) => {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return {
        output: `🤖 Demo Mode: You asked about "${prompt.slice(0, 50)}..." 

Since no OpenAI API key is configured, here's a sample response for educational purposes. This parent-first agent would help explain complex topics like chemistry, physics, and philosophy in an age-appropriate way while maintaining scientific accuracy.

Configure OPENAI_API_KEY in your .env.local to enable real AI responses.`
      };
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a parent-first learning companion. Help parents explain complex topics to children in an educational, safe, and age-appropriate way. Focus on scientific accuracy while making concepts accessible.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'OpenAI API error');
      }

      return {
        output: data.choices[0]?.message?.content || 'No response received'
      };
    } catch (error) {
      return {
        error: `OpenAI Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
};

export async function POST(request: NextRequest) {
  try {
    const { provider = 'openai', prompt, context } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const providerFn = providers[provider as keyof typeof providers];
    if (!providerFn) {
      return NextResponse.json(
        { error: `Provider "${provider}" not supported` },
        { status: 400 }
      );
    }

    const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;
    const result = await providerFn(fullPrompt);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}