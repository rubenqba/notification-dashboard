import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  RichTextField,
  UrlField,
  FunctionField,
  TabbedShowLayout,
  ReferenceField,
  WithRecord,
  Title,
} from "react-admin";
import { Favorite, PersonPin, DataArray, DataObject } from "@mui/icons-material";
import { Request } from "@model/request";

export const RequestShow = () => (
  <Show>
    <Title title="Request..." />
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label="Description" icon={<Favorite />}>
        <UrlField label="ID" source="id" />
        <UrlField label="Path" source="uri" />
        <DateField source="timestamp" />
        <TextField label="Endpoint key" source="key" />
        <TextField source="method" />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Request queries" icon={<DataArray />}>
        <WithRecord
          label="Query params"
          render={(record) => (
            <>
              <pre>{JSON.stringify(record.query, null, 2)}</pre>
            </>
          )}
        />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Request Headers" icon={<DataArray />}>
        <WithRecord
          label="Headers"
          render={(record) => (
            <>
              <pre>{JSON.stringify(record.headers, null, 2)}</pre>
            </>
          )}
        />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Request body" icon={<DataArray />}>
        <WithRecord
          label="Body"
          render={(record) => (
            <>
              <pre>{JSON.stringify(record.body, null, 2)}</pre>
            </>
          )}
        />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Request form" icon={<DataArray />}>
        <WithRecord
          label="Form data"
          render={(record) => (
            <>
              <pre>{JSON.stringify(record.form, null, 2)}</pre>
            </>
          )}
        />
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);
