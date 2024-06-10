import { RequestMethod } from "@model/common";


export type Request = {
  id: string;
  service: string;
  key: string;
  uri: string;
  method: RequestMethod;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: Record<string, unknown>;
  form: Record<string, unknown>;
  timestamp: Date;
};

export type RequestFilter = {
  q: string;
  method: RequestMethod;
  ts_gte: string;
  ts_lte: string;
};
