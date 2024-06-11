import { logger } from "@config/logger";
import { RangeSelector, StatItem, Range } from "@model/dashboard";
import { addDays, addHours, addMinutes, isAfter, startOfDay, startOfHour, startOfMinute, sub } from "date-fns";

export const defaultRange = (view: RangeSelector): Range<Date> => {
  const now = new Date();
  switch (view) {
    case "minute": // last 2 hours
      return { start: startOfMinute(sub(now, { hours: 2 })), end: now };
    case "hourly": // last 24 hours
      return { start: startOfHour(sub(now, { hours: 24 })), end: now };
    default: // last 15 days
      return { start: startOfDay(sub(now, { days: 15 })), end: now };
  }
};

const buildEmptyRange = (period: Range<Date>, view: RangeSelector) => {
  const sequence: StatItem[] = [];
  let current = period.start;
  while (!isAfter(current, period.end)) {
    sequence.push({ts: new Date(current), value: 0}); // add a copy of the current date

    switch (view) {
      case 'minute':
        current = addMinutes(current, 1);
        break;
      case 'hourly':
        current = addHours(current, 1);
        break;
      case 'daily':
        current = addDays(current, 1);
        break;
      default:
        throw new Error('Invalid increment type');
    }
  }
  return sequence;
}

const mergeArrays = (array1: StatItem[], array2: StatItem[]): StatItem[] => {
  const resultMap = new Map<number, StatItem>();

  const addOrUpdate = (item: StatItem) => {
    const timestamp = item.ts.getTime(); // use the timestamp as the key in milliseconds

    if (resultMap.has(timestamp)) {
      const existingItem = resultMap.get(timestamp)!;
      resultMap.set(timestamp, { ts: item.ts, value: existingItem.value + item.value });
    } else {
      resultMap.set(timestamp, item);
    }
  };

  [...array1, ...array2].forEach(addOrUpdate);

  return Array.from(resultMap.values()).sort((a, b) => a.ts.getTime() - b.ts.getTime());
}

export const getRequestCountStats = async (view: RangeSelector): Promise<StatItem[]> => {
  const period = defaultRange(view);
  const sequence = buildEmptyRange(period, view);
  try {
    const response = await fetch(`/api/stats?view=${view}&start=${period.start}&end=${period.end}`);
    if (response.ok) {
      const data: StatItem[] = await response.json();
      return mergeArrays(sequence, data)
    }
  } catch (err) {
    logger.error("error requesting dashboard stats: ", err);
  }
  return sequence;
};

