import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import moment from "moment";
import { Box, Skeleton, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { RangeSelector, StatItem } from "@model/dashboard";
import { getRequestCountStats } from "@lib/dashboard-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function RequestChart() {
  const [range, setRange] = useState<RangeSelector>("daily");
  const [yLabel, setYLabel] = useState("reqs/day");
  const [dateFormat, setDateFormat] = useState("L");

  const { data, isLoading } = useQuery({ queryKey: ["stats_by", range], queryFn: () => getRequestCountStats(range) });
  const queryClient = useQueryClient();
  const handleRangeChange = (value: RangeSelector) => {
    console.log("Selected button: ", value);
    setRange(value ?? "daily");
    switch (value) {
      case "hourly":
        setYLabel("reqs/hour");
        setDateFormat("LT");
        break;
      case "minute":
        setYLabel("reqs/min");
        setDateFormat("LTS");
        break;
      default:
        setYLabel("reqs/day");
        setDateFormat("L");
        break;
    }
  };

  useEffect(() => {
    const n = setInterval(() => {
      console.log("invalidate");
      queryClient.invalidateQueries({ queryKey: ["stats_by"] });
    }, 10000);
    // Cleanup: se ejecuta cuando el componente se desmonta
    return () => clearInterval(n);
  }, []);

  return (
    <Stack sx={{ width: "100%" }}>
      <Box p={2}>
        <ToggleButtonGroup color="primary" value={range} exclusive onChange={(ev, value) => handleRangeChange(value)} aria-label="Platform">
          <ToggleButton value="daily" selected={!range || range === "daily"}>
            Daily
          </ToggleButton>
          <ToggleButton value="hourly" selected={range === "hourly"}>
            Hourly
          </ToggleButton>
          <ToggleButton value="minute" selected={range === "minute"}>
            Minute
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ flex: 1 }}>
        {isLoading ? (
          <Skeleton variant="rectangular" height={300} />
        ) : (
          <BarChart
            dataset={data}
            series={[{ dataKey: "value", label: "Requests" }]}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "ts",
                valueFormatter: (val: Date) => {
                  const ts = moment(val);
                  return ts.format(dateFormat);
                },
                tickPlacement: "middle",
              },
            ]}
            yAxis={[{ label: yLabel }]}
            height={300}
          />
        )}
      </Box>
    </Stack>
  );
}
