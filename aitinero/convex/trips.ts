import { Infer, v } from "convex/values";
import { TABLE_NAME } from "./schema";
import { getDates, getSecondsBetweenTimestamps } from "./utils";
import { query, mutation } from "./_generated/server";

// Models
const createTripBody = v.object({
    start_date: v.string(),
    end_date: v.string(),
    name: v.string(),
    location: v.string()
});
export type CreateTripBody = Infer<typeof createTripBody>;

const updateTripBody = v.object({
    id: v.id(TABLE_NAME.TRIPS),
    start_date: v.optional(v.string()),
    end_date: v.optional(v.string()),
    name: v.optional(v.string()),
    location: v.optional(v.string()),
    events: v.optional(v.array(v.id(TABLE_NAME.EVENTS)))
});
export type UpdateTripBody = Infer<typeof updateTripBody>;

// Functions
export const create = mutation({
    args: {
        body: createTripBody
    },
    handler: async (ctx, { body }) => {
        const tripId = await ctx.db.insert(TABLE_NAME.TRIPS, { ...body });
        return tripId
    }
})

export const read = query({
    args: { id: v.id(TABLE_NAME.TRIPS) },
    handler: async (ctx, { id }) => {
        return ctx.db.get(id)
    },
});

export const update = mutation({
    args: { body: updateTripBody },
    handler: async (ctx, { body }) => {
        const { id, ...rest } = body;
        await ctx.db.patch(id, rest);

        return ctx.db.get(id);
    }
})


export const remove = mutation({
    args: { id: v.id(TABLE_NAME.TRIPS) },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    }
})

export const list = query({
    args: {},
    handler: (ctx, _) => {
        return ctx.db.query(TABLE_NAME.TRIPS).order("desc").collect();
    }
})

export const detail = query({
    args: { id: v.id(TABLE_NAME.TRIPS) },
    handler: async (ctx, { }) => {
        const trip = await ctx.db.query(TABLE_NAME.TRIPS).unique();

        if (!trip || !trip.events || trip.events.length === 0) {
            return {};
        }

        // Assuming getAll fetches events based on event_ids. 
        // It's beneficial if the underlying method has a way of fetching these in a single DB call.
        let events = await Promise.all(trip.events.map(ctx.db.get));

        // If events are always in chronological order in the DB, this sort might not be necessary.
        events.sort((event1, event2) => getSecondsBetweenTimestamps(event2!.start_time, event1!.start_time));

        const days = getDates(trip.start_date, trip.end_date);
        const tripDetails = days.map(day => ({
            date: day.day,
            events: events.filter(event => event!.start_time > day.start && event!.end_time < day.end)
        }));

        return {
            name: trip.name,
            days: tripDetails,
        };
    }
});