// import AdminApp from "@component/AdminApp";
import { getResources } from "@lib/resources";
import { Partition } from "@model/info";
import { NextPage } from "next";
import dynamic from "next/dynamic";
const AdminApp = dynamic(() => import("@component/AdminApp"), { ssr: false });

const Home: NextPage = async () => {
  const resources: Partition[] = await getResources();
  return <AdminApp partitions={resources} />;
};

export default Home;
