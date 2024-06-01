"use client"; // remove this line if you choose Pages Router
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { Dashboard } from "./Dashboard";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import SmsIcon from "@mui/icons-material/Sms";
import CloudIcon from "@mui/icons-material/Cloud";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminApp = () => (
  <Admin dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource
      name="users"
      list={ListGuesser}
      edit={EditGuesser}
      recordRepresentation="name"
      options={{ label: "Email" }}
      icon={MarkEmailUnreadIcon}
    />
    <Resource
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
    />
  </Admin>
);

export default AdminApp;
