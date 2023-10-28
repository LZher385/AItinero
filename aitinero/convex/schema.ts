import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export enum EVENT_STATUS {
    Confirmed = "CONF",
    Possible = "POSS"
}

export default defineSchema({
    trips: defineTable({
        start_date: v.string(),
        end_date: v.string(),
        name: v.string(),
        location: v.string(),
        events: v.optional(v.array(v.id("events")))
    }),
    events: defineTable({
        title: v.string(),
        duration: v.string(), // in miliseconds from Unix Epoch
        start_time: v.string(),
        end_time: v.string(),
        location: v.optional(v.string()),
        status: v.union(v.literal(EVENT_STATUS.Confirmed), v.literal(EVENT_STATUS.Possible)),
        description: v.optional(v.string()),
        context: v.optional(v.string())
    })
});