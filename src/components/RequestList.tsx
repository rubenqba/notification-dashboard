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
import VisibilityIcon from "@mui/icons-material/Visibility";

const RequestPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

export const RequestList = () => (
  <List pagination={<RequestPagination />}>
    <Datagrid rowClick="show">
      <TextField label='ID' source="id" />
      <UrlField label="Path" source="uri" />
      <DateField source="timestamp" />
      <TextField label='Endpoint key' source="key" />
      <TextField source="method" />
      <ShowButton />
    </Datagrid>
  </List>
);
