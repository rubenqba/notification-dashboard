import { logger } from "@config/logger";
import { RangeSelector, StatItem, Range } from "@model/dashboard";
import { startOfMinute, sub, startOfHour, startOfDay } from "date-fns";

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

export const getRequestCountStats = async (view: RangeSelector): Promise<StatItem[]> => {
  const period = defaultRange(view);
  try {
    const response = await fetch(`/api/stats?view=${view}&start=${period.start.getTime()}&end=${period.end.getTime()}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    logger.error("error requesting dashboard stats: ", err);
  }
  return [];
};
