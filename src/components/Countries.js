import React from 'react'

function Countries({ countries }) {
  return (
    <div className="countries">
      {
        countries && countries.map(country => {
          const { 
            name, topLevelDomain, alpha2Code, alpha3Code,
            callingCodes, capital, region, subregion, 
            population, latlng, demonym, area, timezones, 
            borders, nativeName, numericCode, currencies, 
            languages, translations, flag, regionalBlocs
          } = country;
          
          console.log(
            name, topLevelDomain[0], callingCodes[0],
            capital, region, subregion, population, '\n\n'
          );
          return <div className="country-div" key={name}>
            <h1><strong>{name.toUpperCase()}</strong></h1>
            <img 
              src={flag} 
              width={"100%"} 
              minHeight={40} 
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
              {`Region: ${region}, Sub Region: ${region}, 
                Population: ${population}, Latitude: ${latlng[0]}, Longitude: ${latlng[1]}`
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
            </p><br/>
          </div>
        })
      }     
    </div>
  )
}

export default Countries;
