import { Infer, v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Constants
const TRIPS_TABLE_NAME = "trips"

// Models
const createTripBody = v.object({
    start_date: v.string(),
    end_date: v.string(),
    name: v.string(),
    location: v.string()
});
export type CreateTripBody = Infer<typeof createTripBody>;

// Functions
export const create = mutation({
    args: {
        body: createTripBody
    },
    handler: async (ctx, { body }) => {
        const tripId = await ctx.db.insert(TRIPS_TABLE_NAME, { ...body });
        return tripId
    }
})

export const read = query({
    args: { id: v.id(TRIPS_TABLE_NAME) },
    handler: async (ctx, { id }) => {
        return ctx.db.get(id)
    },
});