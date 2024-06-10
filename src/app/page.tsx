import { getResourceServices } from "@lib/resources";
import { ResourceService } from "@model/info";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const AdminApp = dynamic(() => import("@component/AdminApp"), { ssr: false });

const Home: NextPage = async () => {
  const resources: ResourceService[] = await getResourceServices();
  return <AdminApp partitions={resources} />;
};

export default Home;
