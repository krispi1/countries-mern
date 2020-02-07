import React, { useContext } from 'react'

// Context
import { CountriesContext } from '../contexts/CountriesContext';


function Countries({ history }) {
  console.log('Countries rendering...');
  
  const { countries } = useContext(CountriesContext);
  console.log(countries[118]);

  // Navigate to a given country's page upon clicking on it
  const onClickHandler = country => {
    history.push(`/countries/${(country.name).toLowerCase()}`);
  }


  return (
    <div className="countries">
      {
        countries && countries.map((country, index) => {
          const { 
            name, topLevelDomain, alpha2Code, alpha3Code,
            callingCodes, capital, region, subregion, 
            population, latlng, flag, /*  demonym, area, timezones, 
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
              onClick= { () => onClickHandler(country) }
            >
              <h1><strong>{name.toUpperCase()}</strong></h1>
              <img 
                src={flag} 
                width={"100%"} 
                height={"150px"}
                alt={`${name} flag`} 
                style={{ 
                  padding: "5px",
                }}
              />
              <p>
                {`Capital: ${capital}, Alpha2Code: ${alpha2Code}, 
                  Alpha3Code: ${alpha3Code}, Calling Code: ${callingCodes}`
                }
              </p>
              <p>
                {`Region: ${region}, Sub Region: ${subregion}, 
                  Population: ${population}`
                }
              </p>
              <p>
                {`Top Level Domain: ${topLevelDomain}, Latitude: ${latlng[0]}, Longitude: ${latlng[1]}`
                }
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
              <br/>
            </div>
          ) // return
        }) // countries.map
      }     
    </div>
  ) // return
} // Countries

export default Countries;
