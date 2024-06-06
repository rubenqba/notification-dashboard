"use server"
import env from "@config/env";
import { Partition } from "@model/info";
import { createService } from "@service/requests-service";

export async function getResources(): Promise<Partition[]> {
  const service = createService(env.DB_URL, env.DB_NAME);
  return await service.partitions();
}
