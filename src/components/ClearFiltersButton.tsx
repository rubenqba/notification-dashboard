import React from "react";
import { Button, useListContext } from "react-admin";
import { ClearAll } from "@mui/icons-material";

const ClearFiltersButton = () => {
  const { setFilters, filterValues } = useListContext();

  const handleClick = () => {
    // restablecer filtros
    setFilters({}, {}, false);
  };

  if (Object.keys(filterValues).length === 0) return null; // No mostrar si no hay filtros aplicados

  return (
    <Button onClick={handleClick} label="Clear All Filters">
      <ClearAll />
    </Button>
  );
};

export default ClearFiltersButton;
