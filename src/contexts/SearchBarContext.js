import React, { createContext, useState } from "react";

export const SearchBarContext = createContext();

export function SearchBarProvider(props) {
  const [searchActive, setSearchActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <SearchBarContext.Provider value={{ searchActive, setSearchActive, filterActive, setFilterActive, showFilter, setShowFilter }}>
      {props.children}
    </SearchBarContext.Provider>
  );
};