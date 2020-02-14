import React, { useContext } from 'react';

// Contexts
import { CountriesContext } from '../contexts/CountriesContext';


function Country({ match }) {
  console.log('Country rendering...');
  
  const { countries } = useContext(CountriesContext);
  
  const countryName = match.params.name.toLowerCase();
  
  const country = countries.filter(country => country.name.toLowerCase() === countryName);
  
  // Pinpointing a bug
  // console.log('--country--')
  // console.log(country)
  // console.log(typeof country);
  // console.log(Array.isArray(country));
  // console.log(country[0])
  
  if (country[0] === null || country[0] === undefined) {
    return <div className="content-area">
        <br/> 
        <span style={{ color: 'red', fontSize: '1.9em' }}>
          Error: <strong>{ match.params.name }</strong> ☝️ is 
          not a valid country route. Try using the search 
          feature.</span><br/><br/>
      </div>
  }

  return (
    <div style={{ marginTop: "10px" }}>
      {
        country && Object.entries(country[0]).map((key, value) => {
          return <div key={`${value}${key[0]}`}> 
        
            {`${key[0]} ${key[1]}`}

          </div>
        })
      }
    </div>
  ) // return
} // Country

export default Country;


/* 
return (
    <div>
      {
        const { 
          name, topLevelDomain, alpha2Code, alpha3Code,
          callingCodes, capital, region, subregion, 
          population, latlng, flag,   demonym, area, timezones, 
          borders, nativeName, numericCode, currencies, 
          languages, translations, regionalBlocs 
        } = country;
        
        console.log(
          name, topLevelDomain[0], callingCodes[0],
          capital, region, subregion, population, '\n\n'
        ); 

        return (
          <div className="country-div animate fadeInUp country" key={index}>
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
                
            <br/>
          </div>
        )
      }
    </div>
  ) */
