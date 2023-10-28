import React, { useContext, useEffect, memo } from 'react';
import { CountryContext } from './CountryContext';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAndTransformData } from './Api';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: 'calc(100vh - 100px)',
};

const tableStyle = {
  width: '80%',
  maxHeight: '60vh',
};

const CountryList = () => {
  const { countries, setCountries } = useContext(CountryContext);

  useEffect(() => {
    const fetchData = async () => {
      const searchInput = document.getElementById('searchInput');
      const search = searchInput ? searchInput.value : '';
      if (search) {
        const countriesWithId = await fetchAndTransformData(search);
        setCountries(countriesWithId);
      }
    };

    fetchData();
  }, []);

  const formatLanguages = (languages) => {
    if (languages) {
      const languageKeys = Object.keys(languages);
      const languageValues = languageKeys.map(key => languages[key]);
      return languageValues.join(', ');
    }
    return '';
  };

  const formatCurrencies = (currencies) => {
    if (currencies) {
      const currencyKeys = Object.keys(currencies);
      const currenciesInfo = currencyKeys.map(currency => {
        const currencyInfo = currencies[currency];
        return `${currencyInfo.name} (${currencyInfo.symbol})`;
      });
      return currenciesInfo.join(', ');
    }
    return '';
  };

  const columns = [
    { field: 'cca3', headerName: 'Country Code', width: 150 },
    { field: 'officialName', headerName: 'Official Name', width: 320 },
    { field: 'subregion', headerName: 'Sub Region', width: 250 },
    { field: 'languages', headerName: 'Languages', width: 400, valueGetter: params => formatLanguages(params.row.languages) },
    { field: 'currencies', headerName: 'Currencies', width: 650, valueGetter: params => formatCurrencies(params.row.currencies) },
  ];

  return (
    <div style={containerStyle}>
      <div style={tableStyle}>
        <DataGrid
          rows={countries}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default memo(CountryList);
