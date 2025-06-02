import React, { createContext, useContext, useState } from 'react';

const ListingsContext = createContext();

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState([]);

  const addListing = (item) => setListings((prev) => [...prev, item]);
  const removeListing = (name) => setListings((prev) => prev.filter((l) => l.name !== name));

  return (
    <ListingsContext.Provider value={{ listings, addListing, removeListing }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  return useContext(ListingsContext);
}