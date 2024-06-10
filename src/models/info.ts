export type DBInfo = {
  db_name: string;
  props: Record<string, unknown>;
  doc_count: number;
};

export type ResourceService = {
  id: string;
  description: string;
  endpoints: number;
};

export type Information = {
  info: DBInfo;
  partitions: ResourceService[];
};
