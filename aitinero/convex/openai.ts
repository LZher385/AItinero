'use node';
import { Infer, v } from 'convex/values';
import OpenAI from 'openai';

import { action, mutation, query } from './_generated/server';
import { api } from './_generated/api';
import { TABLE_NAME } from './schema';

// Initialize the OpenAI client with the given API key
const apiKey = process.env.OPENAI_API_KEY!;
const openai = new OpenAI({ apiKey });

// Models
const aiMessage = v.object({
  role: v.union(v.literal('user'), v.literal('assistant'), v.literal('system')),
  content: v.string()
});
export type AiMessage = Infer<typeof aiMessage>;

export const chat = action({
  args: { messageHistory: v.array(aiMessage), messageBody: v.string() },
  handler: async (_, { messageHistory, messageBody }) => {
    const newMessageHistory = [
      ...messageHistory,
      {
        // Pass on the chat user's message to GPT
        role: 'user',
        content: messageBody
      } as AiMessage
    ];

    // Get response from GPT
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          // Provide a 'system' message to give GPT context about how to respond
          role: 'system',
          content:
            'You are a helpful bot in a 1-on-1 chat responding to questions about travel with as much accurate information as possible.'
        },
        ...newMessageHistory
      ]
    });

    // Pull the message content out of the response
    const responseContent = response.choices[0].message?.content;

    // Send updated message history
    return [
      ...newMessageHistory,
      {
        role: 'assistant',
        content: responseContent
      }
    ];
  }
});
