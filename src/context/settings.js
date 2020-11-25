import React, { useState } from 'react';

export const SettingsContext = React.createContext();

export default function SettingsProvider(props) {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [sort, setSort] = useState('text');
  const [currentPage, setCurrentPage] = useState(1);
  const state = {
    hideCompleted,
    setHideCompleted,
    itemsPerPage,
    setItemsPerPage,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
  };

  return <SettingsContext.Provider value={state}>{props.children}</SettingsContext.Provider>;
}
