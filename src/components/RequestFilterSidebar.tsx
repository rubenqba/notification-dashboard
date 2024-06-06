import { AccessTime, SwapHoriz } from "@mui/icons-material";
import { Card, CardContent } from "@mui/material";
import { startOfToday, subHours, subMinutes } from "date-fns";
import React, { useEffect, useState } from "react";
import { Button, FilterList, FilterListItem, FilterLiveSearch, SavedQueriesList, Toolbar, useListContext } from "react-admin";
import ClearFiltersButton from "./ClearFiltersButton";

const DateFilter = () => {
  const [filters, setFilters] = useState({
    last5m: subMinutes(Date.now(), 5).toISOString(),
    last15m: subMinutes(Date.now(), 15).toISOString(),
    last1h: subHours(Date.now(), 1).toISOString(),
    today: startOfToday().toISOString(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFilters({
        last5m: subMinutes(Date.now(), 5).toISOString(),
        last15m: subMinutes(Date.now(), 15).toISOString(),
        last1h: subHours(Date.now(), 1).toISOString(),
        today: startOfToday().toISOString(),
      });
    }, 60 * 1000); // Actualiza los filtros cada minuto

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <FilterList label="Filter by date" icon={<AccessTime />}>
      <FilterListItem key="last5m" label="Last 5min" value={{ ts_gte: filters.last5m }} />
      <FilterListItem key="last15m" label="Last 15min" value={{ ts_gte: filters.last15m }} />
      <FilterListItem key="last1h" label="Last hour" value={{ ts_gte: filters.last1h }} />
      <FilterListItem key="today" label="Today" value={{ ts_gte: filters.today }} />
    </FilterList>
  );
};

export const RequestFilterSidebar = () => {
  const methodChoices = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"].map((m) => ({ id: m, name: m }));

  return (
    <>
      <Card sx={{ order: -1, mr: 2, mt: 6, width: 250 }}>
        <CardContent>
          <SavedQueriesList />
          <FilterLiveSearch />
          <DateFilter />
          <FilterList label="Filter by method" icon={<SwapHoriz />}>
            {methodChoices.map((m) => (
              <FilterListItem key={m.id} label={m.name} value={{ method: m.id }} />
            ))}
          </FilterList>
        </CardContent>
      </Card>
    </>
  );
};
