import { env } from "@config/env";
import { logger } from "@config/logger";
import { RangeSelector, Range, StatItem } from "@model/dashboard";
import { startOfDay, startOfHour, startOfMinute, sub } from "date-fns";
import nano, { MangoSelector } from "nano";

type RawStat = {};

export class DashboardService {
  constructor(private readonly db: nano.DocumentScope<RawStat>) {
    // this.createIndexAndViews();
  }

  private defaultRange = (view: RangeSelector): Range<Date> => {
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

  private dateMapper = (value: number[]): Date => {
    const [year, month, day, hour, minute] = value;
    logger.debug("date data: ", value);
    return new Date(year, month - 1, day, hour ?? 0, minute ?? 0, 0, 0);
  };

  private viewName = (view: RangeSelector): string => {
    switch (view) {
      case "minute":
        return "by_minute";
      case "hourly":
        return "by_hour";
      default:
        return "by_day";
    }
  };

  private transformToKey = (date: Date, view: RangeSelector): number[] => {
    switch (view) {
      case "minute":
        return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()];
      case "hourly":
        return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours()];
      default:
        return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()];
    }
  };

  public getStats = (view: RangeSelector, range?: Range<Date>): Promise<StatItem[]> => {
    const period = range ?? this.defaultRange(view);
     const params: nano.DocumentViewParams = {
      startkey: this.transformToKey(period.start, view),
      endkey: this.transformToKey(period.end, view),
      reduce: true,
      group: true,
    };

    logger.debug("stats params: ", params)

    return this.db
      .view("request_statistics", this.viewName(view), params)
      .then((response) => {
        const stats = response.rows.map(({ key, value }) => ({
          ts: this.dateMapper(key as unknown as number[]),
          value: value as number,
        }));
        logger.debug("stats collected: ", stats);
        return stats;
      });
  };
}

export const createDashboardService = () => new DashboardService(nano(env.DB_URL).use(env.DB_NAME));
