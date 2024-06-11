import { getResourceServices } from "@lib/resources";
import { ResourceService } from "@model/info";
import dynamic from "next/dynamic";
import { headers } from "next/headers";

const AdminApp = dynamic(() => import("@component/AdminApp"), { ssr: false });

export default async function Home() {
  headers();
  const resources: ResourceService[] = await getResourceServices();
  return <AdminApp partitions={resources} />;
};

