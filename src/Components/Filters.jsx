import { useState } from "react";
import FilterPopover from "./FilterPopover";

const Filters = ({ columnFilters , setColumnFilters }) => {
  const taskName = columnFilters.find((f) => f.id === "user")?.value || "";

  const onFilterChange = (id, value) => {
    setColumnFilters((prev) => {
      const existingFilterIndex = prev.findIndex((f) => f.id === id);
      const updatedFilters = [...prev];
      
      if (existingFilterIndex > -1) {
        updatedFilters[existingFilterIndex] = { id, value };
      } else {
        updatedFilters.push({ id, value });
      }
  
      return updatedFilters;
    });
  };
  

  return (
    <div className="flex items-center  space-x-3">
      <div className="relative ">
        <input
          type="text"
          placeholder="Search"
          value={taskName}
          onChange={(e) => onFilterChange("user", e.target.value)}
          className="flex w-[300px] rounded-2xl h-8 md:h-10 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

        />
      
      </div>
      <FilterPopover
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
};

export default Filters;
