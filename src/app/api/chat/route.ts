import { streamText, convertToCoreMessages } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { createGroq } from '@ai-sdk/groq';

import { getPortfolioContext } from '@/lib/context';

const PORTFOLIO_CONTEXT = getPortfolioContext();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    console.log('Received request:', {
      messagesCount: messages?.length,
      bodyKeys: Object.keys(body),
    });

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages format:', messages);
      return Response.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Convert messages to core messages format
    const coreMessages = convertToCoreMessages(messages);
    console.log('Converted messages:', { count: coreMessages.length });

    // Try providers in order: Gemini (best) -> Groq -> OpenRouter
    const providers = [
      {
        name: 'Gemini',
        getModel: () => {
          const apiKey = process.env.GEMINI_API_KEY;
          if (!apiKey) throw new Error('GEMINI_API_KEY not configured');
          const googleAI = createGoogleGenerativeAI({ apiKey });
          return googleAI('models/gemini-2.5-flash');
        },
      },
      {
        name: 'Groq',
        getModel: () => {
          const apiKey = process.env.GROQ_API_KEY;
          if (!apiKey) throw new Error('GROQ_API_KEY not configured');

          const groq = createGroq({
            apiKey,
            baseURL: 'https://api.groq.com/openai/v1',
          });
          return groq('llama-3.3-70b-versatile');
        },
      },

      {
        name: 'OpenRouter',
        getModel: () => {
          const apiKey = process.env.OPENROUTER_API_KEY;
          if (!apiKey) throw new Error('OPENROUTER_API_KEY not configured');
          const openRouter = createOpenRouter({
            apiKey,
            baseURL: 'https://openrouter.ai/api/v1',
          });
          // Using Qwen 32B free model - good instruction following
          return openRouter('qwen/qwen-2.5-7b-instruct');
        },
      },
    ];

    // Try each provider in sequence
    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i];
      try {
        console.log(`Attempting to use ${provider.name}...`);
        const model = provider.getModel();

        console.log('System context length:', PORTFOLIO_CONTEXT.length);
        console.log('User messages:', coreMessages.length);

        // For Groq and OpenRouter, inject system as first message
        // For Gemini, use system parameter
        let messages = coreMessages;
        let systemParam = undefined;

        if (provider.name === 'Gemini') {
          systemParam = PORTFOLIO_CONTEXT;
          console.log(`${provider.name}: Using system parameter`);
        } else {
          // Inject system message for Groq and OpenRouter
          messages =
            coreMessages[0]?.role === 'system'
              ? coreMessages
              : [
                  { role: 'system' as const, content: PORTFOLIO_CONTEXT },
                  ...coreMessages,
                ];
          console.log(
            `${provider.name}: Injected system message. Total messages: ${messages.length}, First role: ${messages[0]?.role}`
          );
        }

        const result = await streamText({
          model,
          ...(systemParam && { system: systemParam }),
          messages: messages,
          temperature: 0.7,
          maxRetries: 0, // Disable internal retries to fail fast
        });

        console.log(`✓ Successfully using ${provider.name}`);

        return result.toUIMessageStreamResponse();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.warn(`${provider.name} failed:`, errorMessage);

        // Check if it's a quota/rate limit error
        if (
          errorMessage.includes('quota') ||
          errorMessage.includes('rate limit') ||
          errorMessage.includes('429') ||
          errorMessage.includes('exceeded')
        ) {
          console.log(
            `⚠️  ${provider.name} quota exceeded, trying next provider...`
          );
        }

        // Continue to next provider
        continue;
      }
    }

    // If all providers fail
    return Response.json(
      {
        error:
          'All LLM providers are currently unavailable. Please try again later.',
      },
      { status: 503 }
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      {
        error:
          'The chat service is temporarily unavailable. Please try again later.',
      },
      { status: 500 }
    );
  }
}
