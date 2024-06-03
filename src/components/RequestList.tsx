import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  TextField,
  UrlField,
} from "react-admin";

export const RequestList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <UrlField source="uri" />
      <DateField source="timestamp" />
      <TextField source="key" />
      {/* <TextField source="service" /> */}
      <TextField source="method" />
      <TextField source="headers" />
      <FunctionField
        source="body"
        render={(record: Request) => (
          <pre>{JSON.stringify(record.body, null, 2)}</pre>
        )}
      />
      <TextField source="form" />
      <TextField source="query" />
    </Datagrid>
  </List>
);
