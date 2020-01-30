import React from 'react';

function CountriesList({ countries }) {
  
  return (
    <div>
      <input type="text" list="countriesList"  id="countriesDLInput" />
      <datalist id="countriesList">
        {
          countries && countries.map((country, index) =>
            <option key={index} value={country.name} />
          )
        }
      </datalist>

      <div id="countriesDL"></div>
    </div>
  )
}

export default CountriesList;
