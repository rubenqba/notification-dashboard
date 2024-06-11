import { Card, CardContent, CardHeader } from "@mui/material";
import RequestChart from "./RequestChart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export const Dashboard = () => (
  <QueryClientProvider client={queryClient}>
    <Card>
      <CardHeader title="Processed notifications" />
      <CardContent>
        <RequestChart />
      </CardContent>
    </Card>
  </QueryClientProvider>
);
