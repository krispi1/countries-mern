import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';

import { CountriesContext } from './contexts/CountriesContext';

import Countries from './components/Countries';

function App() {
  const data = useContext(CountriesContext);
  const { countries } = data;
  console.log(countries[135]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Countries countries={countries} />
    </div>
  );
}

export default App;
