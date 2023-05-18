import { useEffect, useState } from "react";
import Countries from "./componenet/Countries";
import Search from "./componenet/Search";
import "./App.css";
import countries from "./componenet/Countries";
const url = "https://restcountries.com/v3.1/all";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountries] = useState([]);
  const [filteredCountres, setfilteredCountres] = useState(country);

  const fetchData = async (url) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setfilteredCountres(data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleRemoveCountry = (name) => {
    const filter = filteredCountres.filter(
      (country) => country.name.common !== name
    );
    setfilteredCountres(filter);
  };

  const handleSearch = (searhValue) => {
    let value = searhValue.toLowerCase();
    const newCountries = country.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.startsWith(value);
    });
    setfilteredCountres(newCountries);
  };
  return (
    <>
      <h1>Country App</h1>
      <Search onSearch={handleSearch} />
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {country && (
        <Countries
          countries={filteredCountres}
          onRemoveCountry={handleRemoveCountry}
        />
      )}
    </>
  );
}

export default App;
