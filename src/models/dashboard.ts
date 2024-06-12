export type RangeSelector = "daily" | "hourly" | "minute";

export type StatItem = {
  ts: number;
  value: number;
};

export type Range<T> = {
  start: T;
  end: T;
};
