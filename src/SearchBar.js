import React, { useContext, memo, useState } from 'react';
import { CountryContext } from './CountryContext';
import { fetchAndTransformData } from './Api';

const SearchBar = () => {
  const { setCountries } = useContext(CountryContext);
  const [ errorMessage, setErrorMessage ] = useState('');

  const handleSearchClick = async () => {
    setErrorMessage(''); // Limpar a mensagem de erro anterior

    const searchInput = document.getElementById('searchInput');
    const search = searchInput ? searchInput.value : '';

    if (search.trim() !== '') {
      try {
        const countriesWithId = await fetchAndTransformData(search);
        setCountries(countriesWithId);
      } catch (error) {
        setErrorMessage(error.message);
        setCountries([]);
      }
    } else {
      setErrorMessage('Preencha o campo de pesquisa.');
    }
  };

  return (
    <div>
      <input id="searchInput" label="Search" />
      <button onClick={handleSearchClick}>Pesquisar</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default memo(SearchBar);
