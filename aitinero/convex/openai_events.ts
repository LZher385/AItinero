"use node";
import { Infer, v } from "convex/values";
import { ChatOpenAI } from "langchain/chat_models/openai"
import { PromptTemplate } from "langchain/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { z } from 'zod';
import { zodToJsonSchema } from "zod-to-json-schema";

import { action } from "./_generated/server";

// Initialize the OpenAI client with the given API key
const apiKey = process.env.OPENAI_API_KEY!;
const model = new ChatOpenAI({
    temperature: 0.8,
    modelName: 'gpt-4',
    openAIApiKey: apiKey,
})

// Input Template
const TEMPLATE = `Extract the requested fields from the input and based on the preferences, provide suggestions - a comma-separated list of real places that the user could go to in the location given within the start_date and end_date

The field "location" refers to the first mentioned location in the input.
The field "start_date" refers to the first mentioned start_date in the input.
The field "end_date" refers to the first mentioned end_date in the input.
The field "preferences" refers to preferences the user has for places they want to visit.
The field "suggestions" refers to a comma-separated list of real places that the user could go to in the location given within the start_date and end_date.

Input:

{input}`;
const prompt = PromptTemplate.fromTemplate(TEMPLATE);

// Output Template
const schema = z.object({
    location: z.string().describe("The location mentioned in the input"),
    suggestions: z.string().describe("Based on the preferences, ONLY return a comma-separated list of real places that the user could go to in the location given within the start_date and end_date"),
    start_date: z.string().describe("The start_date mentioned in the input"),
    end_date: z.string().describe("The end_date mentioned in the input"),
    preferences: z.string().describe("The preferences mentioned in the input"),
});

// Bind formatting to model
const functionCallingModel = model.bind({
    functions: [
        {
            name: "output_formatter",
            description: "Should always be used to properly format output",
            parameters: zodToJsonSchema(schema),
        },
    ],
    function_call: { name: "output_formatter" },
});

// Create Langchain
const chain = prompt
    .pipe(functionCallingModel)
    .pipe(new JsonOutputFunctionsParser());

export const chat = action({
    args: { messageBody: v.string() },
    handler: async (_, { messageBody }) => {

        // TODO
        const result = await chain.invoke({
            input: messageBody,
        });

        return result;
    }
})