import React, { createContext, useState, memo, useMemo } from 'react';
import axios from 'axios';

export const CountriesContext = createContext();

const SetContext = ({ children }) => {
  console.log('SetContext rendering...');
  const [countries, setCountries] = useState([]);
  
  const fetchData = async () => {
    if (JSON.parse(window.localStorage.getItem('countries')) <= 0) {
      const result = await axios(
        'https://restcountries.eu/rest/v2/all'
      );

      // Cache with localStorage
      console.log('Sending to localStorage..');
      window.localStorage.setItem(
        'countries', JSON.stringify(result.data)
      );

      // Populate countries state
      setCountries(
        JSON.parse(window.localStorage.getItem('countries'))
      );
    }
    else {
      // Retrieve from the localStorage
      setCountries(
        JSON.parse(window.localStorage.getItem('countries'))
      );
      console.log('Pulling from localStorage..');
    }
  } // fetchData

  useMemo(fetchData, []);
  
  return (
    <CountriesContext.Provider value={{ countries }}>
      {children}      
    </CountriesContext.Provider>
  )
} // SetContext

const CountriesProvider = memo(SetContext);

export default CountriesProvider;




/* 
import React, {useEffect, useState} from 'react';
import axios from "axios";
import SimpleUserTable from "./SimpleUserTable";

const USER_SERVICE_URL = 'https://jsonplaceholder.typicode.com/users';


function UserTableReactHooks() {
    const [data, setData] = useState({users: [], isFetching: false});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({users: data.users, isFetching: true});
                const response = await axios.get(USER_SERVICE_URL);
                setData({users: response.data, isFetching: false});
            } catch (e) {
                console.log(e);
                setData({users: data.users, isFetching: false});
            }
        };
        fetchUsers();
    }, []);

    return <SimpleUserTable data={data.users}
                            isFetching={data.isFetching}
    />
}

export default UserTableReactHooks
 */