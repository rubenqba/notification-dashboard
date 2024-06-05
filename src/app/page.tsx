// import AdminApp from "@component/AdminApp";
import { NextPage } from "next";
import dynamic from "next/dynamic";
const AdminApp = dynamic(() => import("@component/AdminApp"), { ssr: false });

const Home: NextPage = async () => {
  return <AdminApp partitions={[{ name: "base", count: 0 }]} />;
};

export default Home;
