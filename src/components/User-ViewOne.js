import React, { useState, useMemo } from 'react';
import axios from 'axios';

function ViewUser({ match }) {

  const [user, setUser] = useState({});

  const fetchUser = async () => {
    const username = match.params.username;
    const path = `/api/users/${username}`
    const result = await(axios.get(path));
    setUser(result.data.user[0]);
  } // fetchUser

  useMemo(fetchUser, []);

  if (user.username === undefined) {
    return (
      <div><br/>{`${match.params.username}`} does not exist</div>
    )
  }
  
  return (
    <div>
      <br/>
      { 
        `${user.username} ${user._id}`
      }
    </div>
  ) // return
} // ViewUser

export default ViewUser;
