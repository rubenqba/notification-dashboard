import {
  FunctionField,
  List,
  ShowButton,
  TextField,
  UrlField,
  TopToolbar,
  SelectColumnsButton,
  DatagridConfigurable,
  WrapperField,
} from "react-admin";
import moment from "moment";
import { Request } from "@model/request";
import { RequestFilterSidebar } from "@component/RequestFilterSidebar";
import ClearFiltersButton from "@component/ClearFiltersButton";

const ListToolbar = () => (
  <TopToolbar>
    <ClearFiltersButton />
    <SelectColumnsButton />
  </TopToolbar>
);

const showID = (record: Request) => {
  return record.id.replaceAll(`${record.service}:`, "")
}

const showTime = (record: Request) => {
  const now = moment();
  const ts = moment(record.timestamp);

  const diff = now.diff(ts, "minutes");

  // Si la diferencia es menor de 1 minuto, mostrar como fecha relativa
  const value = diff < 1 ? ts.fromNow() : ts.format("LLL");
  return value;
};

export const RequestList = () => (
  <List actions={<ListToolbar />} sort={{ field: "timestamp", order: "DESC" }} aside={<RequestFilterSidebar />}>
    <DatagridConfigurable rowClick="show" bulkActionButtons={false}>
      <FunctionField label="ID" source="id" render={showID} sortable={false} />
      <UrlField label="Path" source="uri" sortable={false} />
      <FunctionField label="Timestamp" render={showTime} sortBy="timestamp" />
      <TextField label="Endpoint key" source="key" sortable={false}  />
      <TextField source="method" sortable={false} />
      <WrapperField label="Actions">
        <ShowButton />
      </WrapperField>
    </DatagridConfigurable>
  </List>
);
