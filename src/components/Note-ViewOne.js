import React, { useState, useMemo } from 'react';
import axios from 'axios';


function ViewNote({ match }) {

  const [note, setNote] = useState({});

  const fetchNote = async () => {
    const username = match.params.username;
    const noteId = match.params.noteId;
    const path = `/api/notes/${username}/${noteId}`
    const result = await(axios.get(path));
    // setNote(result.data.user[0]);
  } // fetchNote

  useMemo(fetchNote, []);

  // if (user.username === undefined) {
  //   return (
  //     <div><br/>{`${match.params.username}`} does not exist</div>
  //   )
  // }
  
  return (
    <div>
      <br/>
      { 
        `${user.username} ${user._id}`
      }
    </div>
  ) // return
} // ViewNote

export default ViewNote;

/*

view_note: {
  method: "GET",
  url: "/api/notes/:username/:noteId",
  require_login: false
}

*/