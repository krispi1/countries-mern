import React, { useState, useMemo } from 'react';
import axios from 'axios';

function Users() {

  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const result = await(axios.get('/api/users'));
    setUsers(result.data.users);
    // console.log(result.data.users);
  } // fetchAllUsers

  useMemo(fetchAllUsers, []);

  return (
    <div>
      {
        users && users.map((user, index) => {
          return <div key={index}>{ user.username }</div>
        })
      }
    </div>
  ) // return
} // Users

export default Users;
