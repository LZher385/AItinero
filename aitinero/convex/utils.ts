import { DateTime } from 'luxon';

export const convertTimestampToMilliseconds = (timestamp: string) => {
  const date = DateTime.fromISO(timestamp);
  return date.toMillis();
};

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
