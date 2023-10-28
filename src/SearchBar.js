import React, { useContext, memo, useState } from 'react';
import { CountryContext } from './CountryContext';
import { fetchAndTransformData } from './Api';

const inputStyle = {
  fontSize: '18px',
  height: '30px',
};

const buttonStyle = {
  marginLeft: '10px',
  height: '30px',
};

const SearchBar = () => {
  const { setCountries } = useContext(CountryContext); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchClick = async () => {
    setErrorMessage(''); 

    const searchInput = document.getElementById('searchInput');
    const search = searchInput ? searchInput.value : '';

    if (search.length > 3) { 
      try {
        const countriesWithId = await fetchAndTransformData(search);
        setCountries(countriesWithId);
      } catch (error) {
        setErrorMessage(error.message);
        setCountries([]);
      }
    } else if (search.trim() === '') { 
      setErrorMessage('O campo de pesquisa está vazio.');
      setCountries([]);
    } else {
      setErrorMessage('O campo de pesquisa deve conter mais que 3 caracteres.');
      setCountries([]); 
    }
  };

  return (
    <div>
      <input
        id="searchInput"
        label="Search"
        style={inputStyle}
      />
      <button onClick={handleSearchClick} style={buttonStyle}>Pesquisar</button>
      {<div>{errorMessage}</div>}
    </div>
  );
};

export default memo(SearchBar);
