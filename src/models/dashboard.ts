export type RangeSelector = "daily" | "hourly" | "minute";

export type StatItem = {
  ts: Date;
  value: number;
};

export type Range<T> = {
  start: T;
  end: T
}
