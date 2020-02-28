// Modules
import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";

// Context
import { CountriesContext } from "../contexts/CountriesContext";

// Helpers
import HashTable from "../utils/hashTable";
import clearErrorDiv from '../utils/clearErrorDiv';

function CountriesList({ history }) {
  const { countries } = useContext(CountriesContext);

  // Declare a new hash table
  // https://www.youtube.com/watch?v=UOxTMOCTEZk&t=178s
  // http://www.andygup.net/fastest-way-to-find-an-item-in-a-javascript-array/
  // Time complexity for HashTable lookup is O(1) -- very fast
  const countriesHT = new HashTable();

  // Populate hash table with country names where key-value
  // pairs are the same for each country e.g. 
  // key Kenya, value Kenya
  (() => {
    countries.map(country => {
      return countriesHT.setItem(country.name, country.name);
    });
  })();

  const [country2Find, setCountry2Find] = useState("");

  // console.log(Array.isArray(countriesHT.table));
  // console.log(history);
  
  function searchCountry(country) {
    console.log("searchCountry invoked..");
    // Call when either an item (country) is selected, or enter is pressed.
    /** Pseudocode
      Grab selected item (country).
      Check if selected item is in data list (actual list passed to datalist).
      If it's not found, fail gracefully.
      If found, navigate to its page.
    */

    if (!country) {
      return;
    }

    //---------👇 block for visualization only--------
    // Troubleshooting
    console.log("\n>>>>searchTerm<<<<");
    console.log(country);
    console.log(">>>>String(searchTerm)[0].toUpperCase()<<<<");
    console.log(String(country)[0].toUpperCase());
    console.log(">>>>String(searchTerm).slice[1]<<<<");
    console.log(country.slice(1));
    //----------you may delete this ☝️ block----------
    
    country = String(country)[0].toUpperCase() + String(country).slice(1);
    
    //---------👇 block for visualization only--------
    console.log(">>>>formatted_SearchTerm<<<<");
    console.log(country);
    console.log("--result from--countriesHT.getItem(formatted_SearchTerm)--");
    console.log(countriesHT.getItem(country));
    console.log("");
    //----------you may delete this ☝️ block----------

    let targetCountry = countriesHT.getItem(country);   

    //---------👇 block for visualization only--------
    // Troubleshooting
    console.log(typeof targetCountry);
    console.log(String(targetCountry));
    console.log(targetCountry);
    console.log("");

    // Troubleshooting
    if (targetCountry === undefined) {
      console.log('----erratic----');
    }

    if (String(typeof targetCountry) === 'object') {
      console.log('----erratic object----');
    }
    //----------you may delete this ☝️ block----------

    // Failing gracefully without crashing the app is really
    // key. This try{}catch(){} block addresses exactly that.
    try { 
      // No country matching search key exactly was found in countriesHT.
      if (
        targetCountry === undefined ||
        String(typeof targetCountry) === "object"
      ) {
        // Resort to looking for the country in the original data
        // by checking whether the country name in data contains
        // the string provided as the search key.
        const lrCountry = countries.filter(item => {
          
          // Hard-code the case for USA.
          if (
            country.toLowerCase() === 'usa' ||
            country.toLowerCase() === 'us' ||
            country.toLowerCase() === 'america' ||
            country.toLowerCase() === 'united states'
          ) {
            country = 'United States of America'
          }

          // We convert everything to lower case for accurate matching.
          return item.name.toLowerCase().includes(country.toLowerCase());
        });

        //---------👇 block for visualization only--------
        // Troubleshooting
        console.log("--lrCountry--");
        console.log(lrCountry);
        console.log("--lrCountry[0]--");
        console.log(lrCountry[0]);
        //----------you may delete this ☝️ block----------

        const countryURL = `/countries/${lrCountry[0].name.toLowerCase()}`;
        history.push(countryURL); // Navigate to country's page

      } else {
        // A country matching search key was found.
        if (countriesHT.getItem(country)) {
          const countryURL = `/countries/${country.toLowerCase()}`;
          console.log(countryURL);
          history.push(countryURL); // Navigate to country's page
        }
      }
    } catch (err) {
      // console.log(err)
      if (err) {
        document.getElementById(
          "countryError"
        ).innerHTML = `<strong>${country}</strong> is probably not a valid country name!`;
        clearErrorDiv(5, 'countryError');
      }
    }
  } // searchCountry

  const onChangeHandler = event => {
    setCountry2Find(event.target.value);
  }; // onChangeHandler

  // Navigate to a given country's page upon pressing enter.
  const onKeyPressHandler = event => {
    if (event.key === "Enter") {
      searchCountry(country2Find);
      setCountry2Find("");
    }
    // event.target.value =  '';
  }; // onKeyPressHandler


  return (
    <div>
      <input
        type="text"
        list="countriesList"
        name="countrieslist"
        id="countriesDLInput"
        placeholder="Search Country"
        value={country2Find}
        onKeyPress={onKeyPressHandler}
        onChange={event => onChangeHandler(event)}
      />
      <div 
        id="countryError" 
        style={{ margin: "3px 0", color: "red" }}
      ></div>
      <datalist id="countriesList" style={{ height: "300px" }}>
        {countries &&
          countries.map((country, index) => (
            <option key={index}>{country.name}</option>
          ))}
      </datalist>
    </div>
  ); // return
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


  /* 
  // Helper reference to customize
  $(document).ready(function() {
    $("[list='my-list']").on("input propertychange", function() {
      window.location = $("#my-list option[value='"+$("[list='my-list']").val()+"']").find("a").attr("href")
    });
  }); 
  */
