import React, { createContext, useState } from 'react';

export const CountryContext = createContext();

export const CountryProvider = (props) => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  return (
    <CountryContext.Provider value={{ countries, setCountries, search, setSearch }}>
      {props.children}
    </CountryContext.Provider>
  );
};
