import { GenericId } from 'convex/values';
import { DateTime, DiffOptions, DurationUnits } from 'luxon';

export const convertTimestampToMilliseconds = (timestamp: string) => {
  const date = DateTime.fromISO(timestamp);
  return date.toMillis();
};

export const getDates = (startTime: string, endTime: string) => {
  const dateArray = [];
  let currentDate = DateTime.fromISO(startTime).startOf('day');
  const stopDate = DateTime.fromISO(endTime).endOf('day');
  while (currentDate <= stopDate) {
    const newDate: DateTime = DateTime.fromISO(currentDate.toISO()!);
    dateArray.push({
      day: newDate.toLocaleString(),
      start: newDate.toISO()!,
      end: newDate.endOf('day').toISO()!,
    });
    currentDate = currentDate.plus({ days: 1 });
  }
  return dateArray;
}

export const getSecondsBetweenTwoTimestamps = (startTime: string, endTime: string) => {
  const end = DateTime.fromISO(endTime);
  const start = DateTime.fromISO(startTime);
  return end.diff(start, 'seconds').toObject()['seconds']!;
}

export const convertMillisecondsToTimestamp = (ms: number) => {
  const date = DateTime.fromMillis(ms);
  return date.toISO();
};

export const filterUndefinedProperties = <T extends Record<string, any>>(
  obj: T
): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  ) as Partial<T>;
