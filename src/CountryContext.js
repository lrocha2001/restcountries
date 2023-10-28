import React, { createContext, useState } from 'react';

export const CountryContext = createContext();

export const CountryProvider = (props) => {
  const [countries, setCountries] = useState([]);

  return (
    <CountryContext.Provider value={{ countries, setCountries }}>
      {props.children}
    </CountryContext.Provider>
  );
};