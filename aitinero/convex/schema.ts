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
        duration: v.string(), // in miliseconds from Unix Epoch
        start_time: v.string(),
        end_time: v.string(),
        location: v.string(),
        status: v.string(), // convert to enum
        description: v.string(),
        context: v.string()
    })
});