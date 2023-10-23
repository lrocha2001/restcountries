import React, { useContext, memo, useState } from 'react';
import { CountryContext } from './CountryContext';
import { fetchAndTransformData } from './Api';

const SearchBar = () => {
  const { setCountries } = useContext(CountryContext);
  const [searchClicked, setSearchClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchClick = async () => {
    setSearchClicked(true);
    setErrorMessage(''); // Limpar a mensagem de erro anterior

    const searchInput = document.getElementById('searchInput');
    const search = searchInput ? searchInput.value : '';

    if (search.trim() !== '') {
      try {
        const countriesWithId = await fetchAndTransformData(search);
        setCountries(countriesWithId);
      } catch (error) {
        setErrorMessage(error.message);
        setCountries([]); // Limpar os dados no contexto
      }
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
