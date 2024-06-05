import env from "@config/env";
import { Partition } from "@model/info";
import { createService } from "@service/requests-service";

export async function getResources(): Promise<Partition[]> {
  // const res = await fetch("api/health");
  // if (!res.ok) {
  //     throw new Error('Failed to fetch resources');
  // }
  // const data: { partitions: Partition[]} = await res.json();
  // return data.partitions;

  const service = createService(env.DB_URL, env.DB_NAME);

  return await service.partitions();
}
