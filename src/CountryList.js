import React, { useContext, useEffect, memo, useState } from 'react';
import { CountryContext } from './CountryContext';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAndTransformData } from './Api';

const CountryList = () => {
  const { countries, setCountries, search } = useContext(CountryContext);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchClicked) {
        const countriesWithId = await fetchAndTransformData(search);
        setCountries(countriesWithId);
      }
    };

    fetchData();
  }, [search, searchClicked]);

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
    { field: 'officialName', headerName: 'Official Name', width: 200 },
    { field: 'subregion', headerName: 'Sub Region', width: 200 },
    { field: 'languages', headerName: 'Languages', width: 200, valueGetter: params => formatLanguages(params.row.languages)},
    { field: 'currencies', headerName: 'Currencies', width: 500, valueGetter: params => formatCurrencies(params.row.currencies)},
  ];

  return (
    <div style={{ height: 400, width: '55%' }}>
      <DataGrid rows={countries} columns={columns} />
    </div>
  );
};

export default memo(CountryList);
