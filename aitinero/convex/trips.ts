import { Infer, v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Models
const createTripBody = v.object({
    start_date: v.string(),
    end_date: v.string(),
    name: v.string(),
    location: v.string()
});
export type CreateTripBody = Infer<typeof createTripBody>;

// Functions
export const createTrip = mutation({
    args: {
        body: createTripBody
    },
    handler: async (ctx, { body }) => {
        const tripId = await ctx.db.insert("trips", { ...body });
        return tripId
    }
})

export const readTrip = query({
    args: { id: v.id("trips") },
    handler: async (ctx, { id }) => {
        return ctx.db.get(id)
    },
});