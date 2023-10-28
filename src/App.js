import React from 'react';
import { CountryProvider } from './CountryContext';
import SearchBar from './SearchBar';
import CountryList from './CountryList';

const headerStyle = {
  background: '#007bff',
  color: 'white',
  textAlign: 'center',
  marginBottom: '30px',
  padding: '20px',
  fontSize: '24px',
};

const App = () => {
  return (
    <CountryProvider>
      <div style={headerStyle}>
        <h1>REST Countries</h1>
        <SearchBar />
      </div>
      <CountryList />
    </CountryProvider>
  );
};

export default App;
