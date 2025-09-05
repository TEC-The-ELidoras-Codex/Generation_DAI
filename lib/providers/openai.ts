export async function openaiProvider(prompt: string, context?: unknown): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const azureApiKey = process.env.AZURE_OPENAI_API_KEY;

  // If no API keys are configured, return demo/stubbed text
  if (!apiKey && !azureApiKey) {
    return `Demo response for prompt: "${prompt.slice(0, 50)}${prompt.length > 50 ? '...' : ''}"

This is a demo response because no API keys are configured. To use real AI responses:
1. Copy .env.example to .env.local
2. Add your OPENAI_API_KEY or Azure OpenAI credentials
3. Restart the development server

Context provided: ${context ? 'Yes' : 'No'}`;
  }

  try {
    // Use Azure OpenAI if configured
    if (azureApiKey && azureEndpoint) {
      return await callAzureOpenAI(prompt, azureEndpoint, azureApiKey, context);
    }

    // Use OpenAI if configured
    if (apiKey) {
      return await callOpenAI(prompt, apiKey, context);
    }

    return 'No valid API configuration found.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get response from AI provider');
  }
}

async function callOpenAI(prompt: string, apiKey: string, context?: unknown): Promise<string> {
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
          content: 'You are a helpful parenting assistant focused on digital literacy and safety. Provide practical, actionable advice.',
        },
        {
          role: 'user',
          content: context ? `Context: ${JSON.stringify(context)}\n\nPrompt: ${prompt}` : prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response generated';
}

async function callAzureOpenAI(
  prompt: string,
  endpoint: string,
  apiKey: string,
  context?: unknown
): Promise<string> {
  // Construct Azure OpenAI endpoint URL
  const url = `${endpoint}/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-07-01-preview`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful parenting assistant focused on digital literacy and safety. Provide practical, actionable advice.',
        },
        {
          role: 'user',
          content: context ? `Context: ${JSON.stringify(context)}\n\nPrompt: ${prompt}` : context,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`Azure OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response generated';
}