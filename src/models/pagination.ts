export type SortDirection = "asc" | "desc";

export type SortBy = {
  direction: SortDirection;
  property: string;
};

export type Pageable = {
  offset: number;
  limit: number;
  sort: SortBy[];
};

export const DEFAULT_PAGEABLE: Pageable = {
  offset: 0,
  limit: 10,
  sort: [],
};

export type QueryFilter = Record<string, unknown>;
