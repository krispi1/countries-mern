// Modules
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';

// Contexts
import { CountriesContext } from '../contexts/CountriesContext';

// Helper
import HashTable from '../utils/hashTable';

/**
 * CountriesList
 * 
 * 
 * 
 * @param {*} props
 * @returns
 */
function CountriesList(props) {
  
  const { countries } = useContext(CountriesContext);
  const { history } = props;

  // Declare a new hash table
  const countriesHT = new HashTable();

  ( 
    // Populate hash table with country names in small letters
    // where key-value pairs are the same for each country
    // e.g. key kenya, value kenya
    () => {
      countries.map(country => {
        country = country.name.toLowerCase()
        return countriesHT.setItem(
          country, country
        );
      })
    }
  )()

  const [country2Find, setCountry2Find] = useState('');

  console.log(history);

  /**
   *
   *
   */
  function searchCountry(country) {
    console.log('searchCountry invoked..');
    // Call when either an item (country) is selected, or enter is pressed.
    /** Pseudocode
      Grab selected item.
      Check if selected item is in data list (actual list passed to datalist).
      If it's not found, fail gracefully.
      If found, navigate to its page.
    */
    console.log('>>>>options<<<<');
    // console.log(event.target.value);
    console.log('--countriesHT.getItem(event.target.value)--');
    console.log(countriesHT.getItem(country));

    try {
      if (countriesHT.getItem(country)) {
        const countryURL = `/countries/${(country).toLowerCase()}`;
        console.log(countryURL);
        history.push(countryURL)
      } else {
        throw new Error('Country not found!');
      }
    } catch(e) {
      console.log(e)
      // window.location.reload();
      // history.push('/');
      return;
    }
  } // searchCountry

  const onChangeHandler = event => {
    setCountry2Find(event.target.value.toLowerCase());
  } // onChangeHandler
  
  // Navigate to a given country's page upon pressing enter
  const onKeyPressHandler = event => {
    
    if (event.key === 'Enter') {
      // alert('Pressed enter');
      console.log('--countryQuest--');
      console.log(country2Find);
      searchCountry(country2Find);
      setCountry2Find('');
    }
    
    console.log('--key--');
    console.log(event.key);
    // event.target.value =  '';
  } // onKeyPressHandler

  return (
    <div>
      <input 
        type="text" 
        list="countriesList"
        name="countrieslist"
        id="countriesDLInput" 
        placeholder="Search Country"
        value={country2Find}
        onKeyPress={ onKeyPressHandler }
        onChange={ event => onChangeHandler(event) }
      />
      <datalist id="countriesList" style={{ "height": "300px" }}>
        {
          countries && countries.map((country, index) =>
            <option key={index}
            >{country.name}</option>
          )
        }
      </datalist>
    </div>
  ) // return
} // CountriesList

export default withRouter(CountriesList);

/* 
// Datalist reference
// https://stackoverflow.com/questions/23647359/how-do-i-get-the-change-event-for-a-datalist/50389035
$(document).on('change', 'input', function(){
    var options = $('datalist')[0].options;
    var val = $(this).val();
    for (var i=0;i<options.length;i++){
       if (options[i].value === val) {
          alert(val);
          break;
       }
    }
});

// Another reference
// https://stackoverflow.com/questions/30022728/perform-action-when-clicking-html5-datalist-option/32205204#32205204

*/
