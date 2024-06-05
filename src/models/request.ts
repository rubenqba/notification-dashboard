// import { Page } from "@model/pagination";

export type RequestMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTION";
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

// export type RequestsPage = Page<Request>;
