export type SortDirection = "asc" | "desc";

export type SortBy = {
  direction: SortDirection;
  property: string;
};

export type Pageable = {
  page: number;
  size: number;
  sort: SortBy[];
};

export const DEFAULT_PAGEABLE: Pageable = {
  page: 1,
  size: 10,
  sort: [],
};

export type Page<T> = {
  content: T[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
};

export type QueryFilter = Record<string, unknown>;
