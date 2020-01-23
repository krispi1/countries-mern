/****Countries MERN****

****Architecture

***Backend
>>Structure
/api
  /controllers
  /models
  /routes
  -server.js

>>API
  Method  |  URI                            |  Login required?
->POST       /register                         false
->POST       /login                            false
->POST       /logout                           true
->GET        /:username                        true
->PATCH      /:username/edit                   true
->DELETE     /:username/del                    true
->POST       /:username/notes                  true
->GET        /:username/notes                  false
->GET        /:username/notes/:noteId          false
->PATCH      /:username/notes/:noteId/edit     true
->DELETE     /:username/notes/:noteId/del      true

***Frontend
>>Structure
/src
  /components/
  /contexts/

**Components
->Navbar
->Register
->Login
->Countries
  >>https://restcountries.eu/rest/v2/all
->Country
  --Display details of a given country
->CountriesList
  --Display a list of all countries vertically as links
  --Vertical scrolling
->SearchCountries
  --Search by:
    --name (It can be the native name or partial name)
      >>https://restcountries.eu/rest/v2/name/{name}
        https://restcountries.eu/rest/v2/name/eesti
        https://restcountries.eu/rest/v2/name/united
    
    --full name
      >>https://restcountries.eu/rest/v2/name/{name}?fullText=true
        https://restcountries.eu/rest/v2/name/aruba?fullText=true
    
    --code (ISO 3166-1 2-letter or 3-letter country code) 
      >>https://restcountries.eu/rest/v2/alpha/{code}
        https://restcountries.eu/rest/v2/alpha/co
        https://restcountries.eu/rest/v2/alpha/col
    
    --list of codes (list of ISO 3166-1 2-letter or 3-letter country codes)
      >>https://restcountries.eu/rest/v2/alpha?codes={code};{code};{code}
        https://restcountries.eu/rest/v2/alpha?codes=col;no;ee
    
    --currency (ISO 4217 currency code)
      >>https://restcountries.eu/rest/v2/currency/{currency}
        https://restcountries.eu/rest/v2/currency/cop

    --language (ISO 639-1 language code)
      >>https://restcountries.eu/rest/v2/lang/{et}
        https://restcountries.eu/rest/v2/lang/es
    
    --capital city
      >>https://restcountries.eu/rest/v2/capital/{capital}
        https://restcountries.eu/rest/v2/capital/tallinn

    --calling code
      >>https://restcountries.eu/rest/v2/callingcode/{callingcode}
        https://restcountries.eu/rest/v2/callingcode/372

    --region (Africa, Americas, Asia, Europe, Oceania)
      >>https://restcountries.eu/rest/v2/region/{region}
        https://restcountries.eu/rest/v2/region/europe

    --regional bloc:
        EU (European Union)
        EFTA (European Free Trade Association)
        CARICOM (Caribbean Community)
        PA (Pacific Alliance)
        AU (African Union)
        USAN (Union of South American Nations)
        EEU (Eurasian Economic Union)
        AL (Arab League)
        ASEAN (Association of Southeast Asian Nations)
        CAIS (Central American Integration System)
        CEFTA (Central European Free Trade Agreement)
        NAFTA (North American Free Trade Agreement)
        SAARC (South Asian Association for Regional Cooperation)
      >>https://restcountries.eu/rest/v2/regionalbloc/{regionalbloc}
        https://restcountries.eu/rest/v2/regionalbloc/eu
    
    --FILTER RESPONSE
        You can filter the output of your request to include only the specified fields.
      >>https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}
        https://restcountries.eu/rest/v2/all?fields=name;capital;currencies

->Footer
->Countries
->Countries


RESPONSE EXAMPLE
https://restcountries.eu/rest/v2/alpha/col

[
  {
    "name": "Colombia",
    "topLevelDomain": [".co"],
    "alpha2Code": "CO",
    "alpha3Code": "COL",
    "callingCodes": ["57"],
    "capital": "Bogotá",
    "altSpellings": ["CO", "Republic of Colombia", "República de Colombia"],
    "region": "Americas",
    "subregion": "South America",
    "population": 48759958,
    "latlng": [4.0, -72.0],
    "demonym": "Colombian",
    "area": 1141748.0,
    "gini": 55.9,
    "timezones": ["UTC-05:00"],
    "borders": ["BRA", "ECU", "PAN", "PER", "VEN"],
    "nativeName": "Colombia",
    "numericCode": "170",
    "currencies": [
      {
        "code": "COP",
        "name": "Colombian peso",
        "symbol": "$"
      }
    ],
    "languages": [
      {
        "iso639_1": "es",
        "iso639_2": "spa",
        "name": "Spanish",
        "nativeName": "Español"
      }
    ],
    "translations": {
        "de": "Kolumbien",
        "es": "Colombia",
        "fr": "Colombie",
        "ja": "コロンビア",
        "it": "Colombia",
        "br": "Colômbia",
        "pt": "Colômbia"
    },
    "flag": "https://restcountries.eu/data/col.svg",
    "regionalBlocs": [
      {
        "acronym": "PA",
        "name": "Pacific Alliance",
        "otherAcronyms": [],
        "otherNames": ["Alianza del Pacífico"]
      }, 
      {
          "acronym": "USAN",
          "name": "Union of South American Nations",
          "otherAcronyms": ["UNASUR", "UNASUL", "UZAN"],
          "otherNames": ["Unión de Naciones Suramericanas", "União de Nações Sul-Americanas", "Unie van Zuid-Amerikaanse Naties", "South American Union"]
      }
    ],
    "cioc": "COL"
  }
]

*/
