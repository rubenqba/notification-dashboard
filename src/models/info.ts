
export type DBInfo = {
  db_name: string;
  props: Record<string, unknown>;
  doc_count: number;
};

export type Partition = {
  name: string;
  count: number;
};

export type Information = {
  info: DBInfo;
  partitions: Partition[];
};
