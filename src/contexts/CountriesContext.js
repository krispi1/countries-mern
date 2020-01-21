import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CountriesContext = createContext();

function CountriesProvider({ children }) {
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://restcountries.eu/rest/v2/all'
      );
      //console.log(result.data);
      setCountries(result.data);
    };
    fetchData();
  }, []);
  
  return (
    <CountriesContext.Provider value={{ countries }}>
      {children}      
    </CountriesContext.Provider>
  )
}

export default CountriesProvider;
