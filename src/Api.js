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
              languages: country.languages,
              currencies: country.currencies,
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
      throw error;
    }
}

  