import React, { useContext, memo, useState } from 'react';
import { CountryContext } from './CountryContext';
import { DataGrid } from '@mui/x-data-grid';
import TablePagination from '@mui/material/TablePagination';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'calc(100vh - 100px)',
};

const tableStyle = {
  width: '80%',
  maxHeight: '60vh',
};

const rowsPerPageOptions = [5, 10, 15, 20, 25, 30];

const CountryList = () => {
  const { countries } = useContext(CountryContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedCountries = countries.slice(startIndex, endIndex);

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
        <DataGrid rows={paginatedCountries} columns={columns} pagination={false} />
      </div>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={countries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default memo(CountryList);
