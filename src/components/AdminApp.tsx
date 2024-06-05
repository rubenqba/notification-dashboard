"use client";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { Dashboard } from "@component/Dashboard";
import { RequestList } from "@component/RequestList";
import { RequestShow } from "@component/RequestShow";
import { Partition } from "@model/info";

const dataProvider = jsonServerProvider("/api/requests");

type Props = {
  partitions: Partition[];
};

const AdminApp = ({ partitions }: Props) => {
  return (
    <Admin dataProvider={dataProvider} dashboard={Dashboard}>
      {partitions.map((p) => (
        <Resource
          key={p.name}
          name={p.name}
          list={RequestList}
          show={RequestShow}
        />
      ))}
    </Admin>
  );
};

export default AdminApp;
// 
