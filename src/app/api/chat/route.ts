import { streamText, convertToCoreMessages } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

import { PORTFOLIO_CONTEXT } from '@/lib/chatContext';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages format:', messages);
      return Response.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Create Google provider with API key
    const googleAI = createGoogleGenerativeAI({
      apiKey: apiKey,
    });

    // Convert messages to core messages format
    const coreMessages = convertToCoreMessages(messages);

    // Stream the response using AI SDK
    const result = streamText({
      model: googleAI('models/gemini-2.5-flash'),
      system: PORTFOLIO_CONTEXT,
      messages: coreMessages,
      temperature: 0.7,
    });

    // Return UI message stream response for useChat hook
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
