import React, { createContext, useState, memo, useMemo } from 'react';
// import axios from 'axios';

export const CountriesContext = createContext();

const SetCountriesContext = ({ children }) => {
  console.log('SetCountriesContext rendering...');
  const [countries, setCountries] = useState([]);
  
  const fetchDataOffline = async () => {
    const data = require('../assets/countriesV1.json');
    // console.log(data);

    if (JSON.parse(window.localStorage.getItem('countries')) <= 0) {
      
      // Cache with localStorage
      console.log('Sending countries to localStorage..');
      window.localStorage.setItem(
        'countries', JSON.stringify(data)
      );

      // Populate countries state
      setCountries(
        data
        // JSON.parse(window.localStorage.getItem('countries'))
      );
    }
    else {
      // Retrieve from the localStorage
      setCountries(
        JSON.parse(window.localStorage.getItem('countries'))
      );
      console.log('Pulling countries from localStorage..');
    }
  } // fetchDataOffline

/* 
  const fetchDataOnline = async () => {
    if (JSON.parse(window.localStorage.getItem('countries')) <= 0) {
      const result = await axios(
        'https://restcountries.eu/rest/v2/all'
      ); 
      // Cache with localStorage
      console.log('Sending countries to localStorage..');
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
      console.log('Pulling countries from localStorage..');
    }
  } // fetchData
 */
  useMemo(fetchDataOffline, []);
  // useMemo(fetchDataOnline, []);
  
  return (
    <CountriesContext.Provider value={{ countries }}>
      {children}      
    </CountriesContext.Provider>
  )
} // SetCountriesContext

const CountriesProvider = memo(SetCountriesContext);

export default CountriesProvider;
