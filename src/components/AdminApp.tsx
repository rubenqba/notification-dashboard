"use client"; // remove this line if you choose Pages Router
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { Dashboard } from "./Dashboard";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import SmsIcon from "@mui/icons-material/Sms";
import CloudIcon from "@mui/icons-material/Cloud";
import dynamic from "next/dynamic";
import { PouchDataProvider } from "@provider/pouchdb";
import { RequestList } from "./RequestList";
import { RequestShow } from "./RequestShow";

// const PouchDataProvider = dynamic(() => import("@provider/pouchdb"), {
//   ssr: false,
// })
const dataProvider = jsonServerProvider("/api/requests");

const AdminApp = () => (
  <Admin dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource
      name="base"
      list={RequestList}
      show={RequestShow}
      recordRepresentation="id"
      options={{ label: "Base" }}
      icon={MarkEmailUnreadIcon}
    />
    {/* <Resource
      name="posts"
      list={ListGuesser}
      hasEdit={false}
      edit={EditGuesser}
      recordRepresentation="title"
      options={{ label: "SMS" }}
      icon={SmsIcon}
    />
    <Resource
      name="comments"
      list={ListGuesser}
      edit={EditGuesser}
      options={{ label: "Push Notification" }}
      icon={CloudIcon}
    /> */}
  </Admin>
);

export default AdminApp;
