import React, { createContext, useState, memo, useMemo } from 'react';
import axios from 'axios';

export const CountriesContext = createContext();

const SetContext = ({ children }) => {
  console.log('SetContext rendering...');
  const [countries, setCountries] = useState([]);
  
  const fetchData = async () => {
    if (JSON.parse(window.localStorage.getItem('countries')) <= 0) {
      const result = await axios(
        'https://restcountries.eu/rest/v2/all'
      );

      // Cache with localStorage
      console.log('Sending to localStorage..');
      window.localStorage.setItem(
        'countries', JSON.stringify(result.data)
      );

      // Populate countries state
      setCountries(
        JSON.parse(window.localStorage.getItem('countries'))
      );
    }
    else {
      // Retrieve from the localStorage
      setCountries(
        JSON.parse(window.localStorage.getItem('countries'))
      );
      console.log('Pulling from localStorage..');
    }
  } // fetchData

  useMemo(fetchData, []);
  
  return (
    <CountriesContext.Provider value={{ countries }}>
      {children}      
    </CountriesContext.Provider>
  )
} // SetContext

const CountriesProvider = memo(SetContext);

export default CountriesProvider;
