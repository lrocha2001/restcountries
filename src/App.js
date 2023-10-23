import React from 'react';
import { CountryProvider } from './CountryContext';
import SearchBar from './SearchBar';
import CountryList from './CountryList';

const App = () => {
  return (
    <CountryProvider>
      <SearchBar />
      <CountryList />
    </CountryProvider>
  );
};

export default App;
