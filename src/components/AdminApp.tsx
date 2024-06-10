"use client";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { Dashboard } from "@component/Dashboard";
import { RequestList } from "@component/RequestList";
import { RequestShow } from "@component/RequestShow";
import { ResourceService } from "@model/info";

const dataProvider = jsonServerProvider("/api/requests");

type Props = {
  partitions: ResourceService[];
};

const AdminApp = ({ partitions }: Props) => {
  return (
    <Admin dataProvider={dataProvider} dashboard={Dashboard}>
      {partitions.map((p) => (
        <Resource key={p.id} name={p.id} options={{ label: p.description }} list={RequestList} show={RequestShow} />
      ))}
    </Admin>
  );
};

export default AdminApp;
//
