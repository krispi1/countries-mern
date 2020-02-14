import React, { useContext, useState } from "react";

// Context
import { CountriesContext } from "../contexts/CountriesContext";

function Countries({ history }) {
  console.log("Countries rendering...");

  const { countries } = useContext(CountriesContext);
  console.log(countries[118]);

  // We declare the size for the first batch of countries 
  // to display by setting sliceSize to 12 (countries).
  // sliceSize, sliceStart && sliceEnd are integers.
  const [sliceSize, setSliceSize] = useState(12);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd]     = useState(sliceSize);

  /**
   * validateSliceSize is a pure function that receives
   * two inputs, performs a number of checks on the
   * first input and returns an integer in its place.
   *
   * @param {*} sliceSizeInput
   * @param {*} dataArray
   * @returns {} Number
   */
  function validateSliceSize(sliceSizeInput, dataArray) {
    // Ensure chunkSize is a number.
    let chunkSize = Number(sliceSizeInput);

    // If chunkSize is a float, turn it into an integer..
    if (chunkSize % 1 !== 0) {
      chunkSize = Math.floor(chunkSize);
    }

    // If chunkSize is negative or it's not a number..
    if (
      chunkSize < 0 ||
      isNaN(chunkSize)
    ) {
      chunkSize = 12;
    }

    // If chunkSize is larger than the data (countries) size..
    if (chunkSize > dataArray.length) {
      chunkSize = dataArray.length;
    }

    return chunkSize;

  } // validateSliceSize
  
  /**
   * nextSlice is an impure function that modifies state; in
   * this case sliceStart and sliceEnd.
   *
   * @param {*} sliceSize
   * @param {*} dataArray
   * @returns {} undefined
   */
  function nextSlice(sliceSizeInput, dataArray) {
    const chunkSize = validateSliceSize(sliceSizeInput, dataArray);

    console.log('--chunkSize--')
    console.log(chunkSize)
    let start = sliceStart + chunkSize;
    let end   = sliceEnd + chunkSize;

    // At this point we know that there's room to click prev
    // so we enable the prev buttons.
    document.getElementById("prev-button1").disabled = false;
    document.getElementById("prev-button2").disabled = false;
    
    // Test for when we surpass the maximum number of items.
    // The application actually wouldn't break, but it's good
    // practice.
    if (start > dataArray.length) {
      document.getElementById("next-button1").disabled = true;
      document.getElementById("next-button2").disabled = true;
      return;
    }

    // For visualization
    console.log('--nxt chunkSize--')
    console.log(chunkSize)
    console.log('--nxt start--')
    console.log(start)
    console.log('--nxt end--')
    console.log(end)
    console.log()
    console.log()

    setSliceStart(Math.floor(start));
    setSliceEnd(Math.floor(end));

  } // nextSlice

  
   /**
   * nextSlice is an impure function that modifies state; in
   * this case sliceStart and sliceEnd.
   *
   * @param {*} sliceSize
   * @param {*} dataArray
   * @returns {} undefined
   */
  function prevSlice(sliceSizeInput, dataArray) {
    const chunkSize = validateSliceSize(sliceSizeInput, dataArray);
    
    let start = sliceStart - chunkSize;
    let end   = sliceEnd - chunkSize;

    // At this point we know that there's room to click next
    // so we enable the next buttons.
    document.getElementById("next-button1").disabled = false;
    document.getElementById("next-button2").disabled = false;
    
    // Test for when we surpass index 0 tending towards
    // the negative.
    if (start < 0 || end < 0) {
      start = 0;
      end   = start + chunkSize;
      document.getElementById("prev-button1").disabled = true;
      document.getElementById("prev-button2").disabled = true;
      return;
    }

    // For visualization
    console.log('--prv chunkSize--')
    console.log(chunkSize)
    console.log('--prv start--')
    console.log(start)
    console.log('--prv end--')
    console.log(end)

    setSliceStart(Math.floor(start));
    setSliceEnd(Math.floor(end));

  } // prevSlice
  
  // Navigate to a given country's page upon clicking on it.
  const onClickHandler = country => {
    history.push(`/countries/${country.name.toLowerCase()}`);
  };

  return (
    <div className="countries">
      <button 
        id="prev-button1"
        className="page-button" 
        onClick={ () => prevSlice(sliceSize, countries) }
      >{` prev <<< `}</button>
      
      <button 
        id="next-button1"
        className="page-button" 
        onClick={ () => nextSlice(sliceSize, countries) }
      >{` next >>> `}</button>
      
      {countries &&
        countries.slice(sliceStart, sliceEnd).map((country, index) => {
          const {
            name, topLevelDomain, alpha2Code, alpha3Code,
            callingCodes, capital, region, subregion,
            population, latlng, flag 
            
            /*  demonym, area, timezones, 
            borders, nativeName, numericCode, currencies, 
            languages, translations, regionalBlocs */
          } = country;

          /* console.log(
            name, topLevelDomain[0], callingCodes[0],
            capital, region, subregion, population, '\n\n'
          ); */

          return (
            <div
              className="country-div animate fadeInUp country"
              key={index}
              onClick={() => onClickHandler(country)}
            >
              <h1>
                <strong>{name.toUpperCase()}</strong>
              </h1>
              <img
                src={flag}
                width={"100%"}
                height={"150px"}
                alt={`${name} flag`}
                style={{
                  padding: "5px"
                }}
              />
              <p>
                {`Capital: ${capital}, Alpha2Code: ${alpha2Code}, 
                  Alpha3Code: ${alpha3Code}, Calling Code: ${callingCodes}`}
              </p>
              <p>
                {`Region: ${region}, Sub Region: ${subregion}, 
                  Population: ${population}`}
              </p>
              <p>
                {`Top Level Domain: ${topLevelDomain}, Latitude: ${latlng[0]}, Longitude: ${latlng[1]}`}
              </p>
              {/* 
              <p>
                {`Demonym: ${demonym}, Area: ${area}, 
                  Native Name: ${nativeName}, Numeric Code: ${numericCode}`
                }
              </p>
              <p>
                {`Borders: ${borders.toString()}, Timezone: ${timezones.toString()}`}
              </p>
              <p>
                {`Currencies: ${JSON.stringify(currencies)}`}
              </p>
              <p>
                {`Languages: ${JSON.stringify(languages)}`}
              </p>
              <p>
                {`translations: ${JSON.stringify(translations)}`}
              </p>
              <p>
                {`Regional Blocs: ${JSON.stringify(regionalBlocs)}`}
              </p>
                 */}
              <br />
            </div>
          ); // return
        }) // countries.map
       }

      <button 
        id="prev-button2"
        className="page-button-bottom" 
        onClick={ () => prevSlice(sliceSize, countries) }
      >{` prev <<< `}</button>
      
      <button 
        id="next-button2"
        disabled={false}
        className="page-button-bottom" 
        onClick={ () => nextSlice(sliceSize, countries) }
      >{` next >>> `}</button>
    </div>
  ); // return
} // Countries

export default Countries;
