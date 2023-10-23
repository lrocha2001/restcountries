export async function fetchAndTransformData(search) {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/subregion/${search}`);
      if (response.status === 200) {
        const data = await response.json();
    
        const countriesWithId = Array.isArray(data)
          ? data.map(country => ({
              id: country.cca3,
              officialName: country.name.official,
              subregion: country.subregion,
              languages: formatLanguages(country.languages),
              currencies: formatCurrencies(country.currencies),
              ...country,
            }))
          : [];
    
        return countriesWithId;
      } else if (response.status === 404) {
        throw new Error("Dados não encontrados. Verifique a região.");
      } else if (response.status === 500) {
        throw new Error("Erro interno do servidor. Tente novamente mais tarde.");
      } else {
        throw new Error("Erro desconhecido na solicitação.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      throw error;
    }
  }
  
  function formatLanguages(languages) {
    if (languages) {
      const languageKeys = Object.keys(languages);
      const languageValues = languageKeys.map(key => languages[key]);
      return languageValues.join(', ');
    }
    return '';
  }
  
  function formatCurrencies(currencies) {
    if (currencies) {
      const currencyKeys = Object.keys(currencies);
      const currenciesInfo = currencyKeys.map(currency => {
        const currencyInfo = currencies[currency];
        return `${currencyInfo.name} (${currencyInfo.symbol})`;
      });
      return currenciesInfo.join(', ');
    }
    return '';
  }
  