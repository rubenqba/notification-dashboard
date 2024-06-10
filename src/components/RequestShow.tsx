import {
  Show,
  TextField,
  DateField,
  UrlField,
  TabbedShowLayout,
  WithRecord,
  Title,
  useRedirect,
  useRecordContext,
  TopToolbar,
  Button,
} from "react-admin";
import { ListAlt, FilterList, TextFields, Description, FormatListBulleted } from "@mui/icons-material";
import TextCode from "@component/TextCode";

const ShowActions = () => {
  const redirect = useRedirect();
  const record = useRecordContext();

  return (
    <TopToolbar>
      <Button label="Back" onClick={() => redirect(`/${record.service}`)} />
    </TopToolbar>
  )
}

export const RequestShow = () => {
  return (
    <Show actions={<ShowActions />}>
      <Title title="Request..." />
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Description" icon={<ListAlt />}>
          <UrlField label="ID" source="id" />
          <UrlField label="Path" source="uri" />
          <TextField source="method" />
          <TextField label="Endpoint key" source="key" />
          <DateField source="timestamp" showTime />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Query params" icon={<FilterList />}>
          <WithRecord label="Query params" render={(record) => <TextCode language="json" code={JSON.stringify(record.query, null, 2)} />} />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Request Headers" icon={<TextFields />}>
          <WithRecord label="Headers" render={(record) => <TextCode language="json" code={JSON.stringify(record.headers, null, 2)} />} />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Request body" icon={<Description />}>
          <WithRecord label="Body" render={(record) => <TextCode language="json" code={JSON.stringify(record.body, null, 2)} />} />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Request form" icon={<FormatListBulleted />}>
          <WithRecord label="Form data" render={(record) => <TextCode language="json" code={JSON.stringify(record.form, null, 2)} />} />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
