import { Infer, v } from 'convex/values';
import { EVENT_STATUS, TABLE_NAME } from './schema';
import { getDates, getSecondsBetweenTimestamps } from "./utils";
import { query, mutation } from './_generated/server';
import { TripDoc } from '../src/app/types/trip';
import { DateTime } from 'luxon';
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
    return tripId;
  }
});

export const read = query({
  args: { id: v.id(TABLE_NAME.TRIPS) },
  handler: async (ctx, { id }) => {
    return ctx.db.get(id);
  }
});

export const update = mutation({
  args: { body: updateTripBody },
  handler: async (ctx, { body }) => {
    const { id, ...rest } = body;
    await ctx.db.patch(id, rest);

    return ctx.db.get(id);
  }
});

export const remove = mutation({
  args: { id: v.id("trips") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  }
});

export const list = query({
  args: {},
  handler: async (ctx, _) => {
    const data = await ctx.db.query('trips').order('desc').collect();
    let res = data.map(data => formatData(data));
    return res;
  }
});

function formatData(data: TripDoc) {
  let formattedStartDate = DateTime.fromISO(data.start_date).toLocaleString(DateTime.DATE_MED);
  let formattedEndDate = DateTime.fromISO(data.end_date).toLocaleString(DateTime.DATE_MED);
  data.start_date = formattedStartDate;
  data.end_date = formattedEndDate;

  return data;
}

export const detail = query({
  args: { id: v.id(TABLE_NAME.TRIPS) },
  handler: async (ctx, { id }) => {
    const trip = await ctx.db.get(id);

    if (!trip) {
      return {};
    }

    const days = getDates(trip.start_date, trip.end_date);
    if (!trip.events || trip.events.length === 0) {
      return {
        name: trip.name,
        days: days.map(day => ({
          date: day.day,
          events: [],
        }))
      }
    }

    const events = await Promise.all(trip.events.map(ctx.db.get));

    const filteredEvents = events
      // Filters out null events
      .filter(event => event != null)
      // If events are always in chronological order in the DB, this sort might not be necessary.
      .sort((event1, event2) => getSecondsBetweenTimestamps(event2!.start_time, event1!.start_time));

    const tripDetails = days.map(day => ({
      date: day.day,
      events: filteredEvents.filter(event => event!.start_time > day.start && event!.start_time < day.end)
    }));

    return {
      name: trip.name,
      days: tripDetails,
    };
  }
});

export const possible_events = query({
  args: { id: v.id(TABLE_NAME.TRIPS) },
  handler: async (ctx, { id }) => {
    const trip = await ctx.db.get(id);

    if (!trip || !trip.events) {
      return [];
    }

    const events = await Promise.all(trip.events.map(ctx.db.get));

    const possibleEvents = events
      // Filters out null events
      .filter(event => event?.status == EVENT_STATUS.Possible)

    return possibleEvents;
  }
})
