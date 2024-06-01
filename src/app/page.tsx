import { Dashboard } from "@component/Dashboard";
import { Admin } from "react-admin";

export default function Home() {
  return (
    <Admin dashboard={Dashboard} />
  );
}
