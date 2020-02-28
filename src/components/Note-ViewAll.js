import React, { useState, useMemo } from 'react';
import axios from 'axios';


function Notes() {
  const [notes, setNotes] = useState([]);

  const fetchAllNotes = async () => {
    const result = await(axios.get('/api/notes'));
    setNotes(result.data.notes);
    // console.log(result.data.notes);
  } // fetchAllNotes

  useMemo(fetchAllNotes, []);
  console.log(notes[0]);

  return (
    <div>
      {
        notes && notes.map((note, index) => {
          const { 
            subject, country, stateOrCity, town, content, _id,
            user: { username } 
          } = note;
          
          return <div key={index}>
            <p>{ `Username : ${username}` }</p>
            <p>{ `Note_id : ${_id}` }</p>
            <p>{ `Subject : ${subject}` }</p>
            <p>{ country && `Country : ${country}` }</p>
            <p>{ stateOrCity && `State or City : ${stateOrCity}` }</p>
            <p>{ town && `Town : ${town}` }</p>
            <p>{ `Content : ${content}` }</p>
            <br/><br/>
          </div>
        })
      }
    </div>
  ) // return
} // Notes

export default Notes

/*

all_notes: {
  method: "GET",
  url: "/api/notes",
  require_login: false
}

*/

