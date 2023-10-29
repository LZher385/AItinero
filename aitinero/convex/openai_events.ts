'use node';
// Convex Imports
import { v } from 'convex/values';


// Langchain Imports
import { PromptTemplate } from 'langchain/prompts';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';

// Zod Validation Imports
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { action } from './_generated/server';
import { api } from './_generated/api';
import { createModel } from './utils';
import { TABLE_NAME } from './schema';

export const chat = action({
  args: { tripId: v.id(TABLE_NAME.TRIPS), messageBody: v.string() },
  handler: async (ctx, { tripId, messageBody }) => {
    const suggestionsModel = createModel();

    // Input Template
    const SUGGESTIONS_TEMPLATE = `Extract the requested fields from the input and based on the preferences, provide suggestions - an array of real places that the user could go to in the location given within the start_date and end_date

    The field "location" refers to the first mentioned location in the input.
    The field "start_date" refers to the first mentioned start_date in the input.
    The field "end_date" refers to the first mentioned end_date in the input.
    The field "preferences" refers to preferences the user has for places they want to visit.
    The field "suggestions" refers to an array of real places that the user could visit near the location given. It should be accessible within the start_date and end_date.
    The field "context" refers to information that is relevant for someone visiting the suggested places from the start_date to the end_date, taking into account the preferences provided. Include details like what to look out for, the main attractions, risks, budget and any other travel information. Give as much details as possible.
    The field "descriptions" refers an array of descriptions of the suggestions in the same order.

    Input:

    {input}`;
    const suggestionsPrompt = PromptTemplate.fromTemplate(SUGGESTIONS_TEMPLATE);

    // Output Template
    const suggestionSchema = z.object({
      location: z.string().describe('The location mentioned in the input'),
      suggestions: z
        .array(z.string())
        .describe(
          'Based on the preferences, ONLY return an array of five real places that the user could go to in the location given within the start_date and end_date'
        ),
      start_date: z.string().describe('The start_date mentioned in the input'),
      end_date: z.string().describe('The end_date mentioned in the input'),
      preferences: z
        .string()
        .describe('The preferences mentioned in the input'),
      context: z
        .string()
        .describe(
          'Information that is relevant for someone visiting the suggested places from the start_date to the end_date, taking into account the preferences provided. Include details like what to look out for, the main attractions, risks, budget and any other travel information. Give as much details as possible.'
        ),
      descriptions: z
        .array(z.string())
        .describe(
          'An array of descriptions for each suggestion, in the same order as the suggestions'
        )
    });

    // Bind formatting to model
    const suggestionsCallingModel = suggestionsModel.bind({
      functions: [
        {
          name: 'output_formatter',
          description: 'Should always be used to properly format output',
          parameters: zodToJsonSchema(suggestionSchema)
        }
      ],
      function_call: { name: 'output_formatter' }
    });

    // Create Langchain
    const suggestionsChain = suggestionsPrompt
      .pipe(suggestionsCallingModel)
      .pipe(new JsonOutputFunctionsParser());

    const trip = await ctx.runQuery(api.trips.read, { id: tripId });

    let result = await suggestionsChain.invoke({
      input: messageBody
    });

    console.log(result)

    if ("descriptions" in result && "suggestions" in result) {
      const descriptions: string[] = result["descriptions"] as any;
      const suggestions: string[] = result["suggestions"] as any;

      console.log(descriptions)
      console.log(suggestions)

      const event_infos = suggestions.map((suggestion, i) => [suggestion, descriptions[i]])

      console.log(event_infos)

      for (const info of event_infos) {
        const eventId = await ctx.runMutation(api.events.create, {
          event: {
            title: info[0],
            description: info[1],
            start_time: trip?.start_date!,
            end_time: trip?.end_date!,
          }
        });

        await ctx.runMutation(api.trips.addEvent, {
          tripId,
          eventId
        });

      };

    }

    return {}

  }
});
