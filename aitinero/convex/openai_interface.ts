import { v } from "convex/values"
import { TABLE_NAME } from "./schema"
import { api } from "./_generated/api"
import { mutation } from "./_generated/server"

export const getsuggestions = mutation({
    args: { messageBody: v.string() },
    handler: async (ctx, { messageBody }) => {
        await ctx.scheduler.runAfter(0, api.openai_events.chat, {
            messageBody,
        })
    },
})