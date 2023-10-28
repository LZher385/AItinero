import { query, mutation } from './_generated/server';
import { Infer, v } from 'convex/values';
import {
  convertTimestampToMilliseconds,
  filterUndefinedProperties
} from './utils';
import { EVENT_STATUS } from './schema';

const EVENTS_TABLE_NAME = 'events';

const createEvent = v.object({
  start_time: v.string(),
  end_time: v.string(),
  title: v.string()
});

export type CreateEventArgs = Infer<typeof createEvent>;

const updateEvent = v.object({
  id: v.id(EVENTS_TABLE),
  title: v.optional(v.string()),
  duration: v.optional(v.string()),
  start_time: v.optional(v.string()),
  end_time: v.optional(v.string()),
  location: v.optional(v.string()),
  status: v.optional(v.string()),
  description: v.optional(v.string()),
  context: v.optional(v.string())
});

export type UpdateEventArgs = Infer<typeof updateEvent>;

export const create = mutation({
  args: { event: createEvent },
  handler: async (ctx, { event }) => {
    const start = event.start_time;
    const end = event.end_time;
    // check that event can be scheduled, return error if not possible

    const eventId = await ctx.db.insert(EVENTS_TABLE, {
      start_time: start,
      end_time: start,
      status: EVENT_STATUS.Confirmed,
      duration: (
        convertTimestampToMilliseconds(end) -
        convertTimestampToMilliseconds(start)
      ).toString(),
      title: event.title
    });
    return eventId;
  }
});

export const get = query({
  args: { eventId: v.id(EVENTS_TABLE) },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    return event;
  }
});

export const update = mutation({
  args: { event: updateEvent },
  handler: async (ctx, args) => {
    const {
      id,
      title,
      duration,
      start_time,
      end_time,
      location,
      status,
      description,
      context
    } = args.event;

    await ctx.db.patch(
      id,
      filterUndefinedProperties({
        title,
        duration,
        start_time,
        end_time,
        location,
        status,
        description,
        context
      })
    );
  }
});

export const deleteEvent = mutation({
  args: { id: v.id(EVENTS_TABLE) },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  }
});
