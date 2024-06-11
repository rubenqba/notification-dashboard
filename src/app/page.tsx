import { getResourceServices } from "@lib/resources";
import { ResourceService } from "@model/info";
import dynamic from "next/dynamic";
import { headers } from "next/headers";

const AdminApp = dynamic(() => import("@component/AdminApp"), { ssr: false });

export default async function Home() {
  headers(); // this call is just to force the page to be dynamic to avoid pre-rendering on build phase
  const resources: ResourceService[] = await getResourceServices();
  return <AdminApp partitions={resources} />;
};

