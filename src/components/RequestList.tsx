import {
  Button,
  Datagrid,
  DateField,
  FunctionField,
  Link,
  List,
  Pagination,
  ShowButton,
  TextField,
  UrlField,
  useRecordContext,
} from "react-admin";
import moment from "moment";
import { Request } from "@model/request";

const RequestPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

const showTime = (record: Request) => {
  const ahora = moment();
  const ts = moment(record.timestamp);

  const diff = ahora.diff(ts, "minutes");

  // Si la diferencia es menor de 1 minuto, mostrar como fecha relativa
  const value = diff < 1 ? ts.fromNow() : ts.format("LLL");
  return value;
};

export const RequestList = () => (
  <List sort={{ field: "timestamp", order: "DESC" }}>
    <Datagrid rowClick="show">
      <TextField label="ID" source="id" />
      <UrlField label="Path" source="uri" />
      <FunctionField label="TS" render={showTime} />
      <DateField source="timestamp" showTime />
      <TextField label="Endpoint key" source="key" />
      <TextField source="method" />
      <ShowButton />
    </Datagrid>
  </List>
);
