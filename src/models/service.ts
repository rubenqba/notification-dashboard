import { RequestMethod } from "@model/common";

export type Endpoint = {
  key: string;
  uri: string;
  method: RequestMethod
  response: string;
  template: string;
  templateContent?: string
}

export type Service = {
  service: string;
  description: string;
  endpoints: Record<string, Endpoint>
}

export type Configuration = {
  services: Service[]
}
