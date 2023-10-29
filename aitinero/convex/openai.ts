'use node';
import { Infer, v } from 'convex/values';
import OpenAI from 'openai';

import { action } from './_generated/server';

// Initialize the OpenAI client with the given API key
const apiKey = "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";
const openai = new OpenAI({ apiKey });

// Models
const aiMessage = v.object({
  role: v.union(v.literal('user'), v.literal('assistant'), v.literal('system')),
  content: v.string()
});
export type AiMessage = Infer<typeof aiMessage>;

export const chat = action({
  args: { messageHistory: v.array(aiMessage), messageBody: v.string(), messageContext: v.string()},
  handler: async (_, { messageHistory, messageBody, messageContext}) => {
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
          'You are a helpful bot in a 1-on-1 chat responding to questions about travel, specifically about their trip given in the provided json after this prompt. Give short and sweet responses. You can also try and parse this json file as a basis for answering any questions the user has in particular about their trip, such as about dates, timings, and events: ' + messageContext 
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
