/****Countries MERN****

---------------------------------------------------------------------------
****Architecture

>>Stack --> MERN (MongoDB, Express, React, Node.js)

>>Backend (api):

Package           Purpose
-----------------------------------------------------------------------
Node              Runtime engine
Express           Server
Express.Router()  Shipped with Express. Handles routing
Bcrypt            Encrypt password (1-way), validate login-provided password
Cors              Enable cross-origin (inter-domain) resource sharing
Dotenv            Load environment variables
JSONWebToken      Sign user parameters and generate auth token
Mongoose          ORM to abstract away MongoDB operations
MongoDB           Data persistence store
Morgan            Log api requests to the console

>>Frontend:

Package           Purpose
-----------------------------------------------------------------------
React             Frontend library
ReactDOM          Manage DOM internally and render elements in React
React-router-dom  Handle all routing related actions in React
Axios             Handle frontend<-->backend communication


---------------------------------------------------------------------------
***Backend

>>Structure

/api
  /controllers
    auth.controllers.js
    note.controllers.js
    user.controllers.js
  /middleware
    check-auth.js
  /models
    note.model.js
    user.model.js
  /routes
    auth.routes.js
    note.routes.js
    user.routes.js
  .gitignore
  package-lock.json
  package.json
  server.js

---------------------------------------------------------------------------
>>API
          
Segment   Method   URI                              Login required?
-----------------------------------------------------------------------
Auth
          POST     /api/auth/signup                     false
          POST     /api/auth/login                      false
          POST     /api/auth/logout                     true
-----------------------------------------------------------------------
Users      
          GET      /api/users                           false
          GET      /api/users/username                  false
          PATCH    /api/users/username/edit             true
          DELETE   /api/users/username/del              true
-----------------------------------------------------------------------
Notes     
          POST     /api/notes/:username                 true
          GET      /api/notes                           false
          GET      /api/notes/:username                 false
          GET      /api/notes/:username/:noteId         false
          PATCH    /api/notes/:username/:noteId/edit    true
          DELETE   /api/notes/:username/:noteId/del     true
---------------------------------------------------------------------------

---------------------------------------------------------------------------
***Frontend

>>Structure

/src
  /assets/
  /components/
  /contexts/

---------------------------------------------------------------------------
**Components
->Navbar
->SignUp
->Login
->Footer
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


---------------------------------------------------------------------------
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

---------------------------------------------------------------------------

*/


/**Reminders to self

// src/components/CountriesList.js
// Get it to navigate to country upon click on or pressing 
// enter datalist option.

// src/components/SignIn.js
// Implement input validation.

// src/components/SignUp.js
// Implement input validation.


 */