// Modules
import React, { useState, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

// Contexts
import { CountriesContext } from '../contexts/CountriesContext';

function CountriesList(props) {
  const { countries } = useContext(CountriesContext);
  const { history } = props;

  console.log(countries[0].name.common)
  console.log(history);
   const [kantri, setKantri] = useState('');
/*  
  const onChangeHandler = event => {
    setKantri(event.target.value);
  } // onChangeHandler

  const { history } = props;
 */  

  // Navigate to a given country's page upon clicking on it
  const onChangeHandler = ({ event, country }) => {
    // alert('Should redirect...')
    
    console.log(event.target.value);
    const countryURL = `/countries/${(event.target.value).toLowerCase()}`;
    console.log(countryURL);
    history.push(countryURL)
    event.target.value =  '';
    
  } // onChangeHandler
  
  
  return (
    <div>
      <input 
        type="text" 
        list="countriesList"
        name="countrieslist"
        id="countriesDLInput" 
        placeholder="Search Country"
        onChange={ event => onChangeHandler({ event }) }
      />
      <datalist id="countriesList">
        {
          countries && countries.map((country, index) =>
            <option key={index}
            >{country.name.common}</option>
          )
        }
      </datalist>

      <div id="countriesDL"></div>
    </div>
  ) // return
} // CountriesList

export default withRouter(CountriesList);


/* <div onClick={ () => onClickHandler(country) } key={ index }>
  <option value={country.name.common}></option> />
</div> */

