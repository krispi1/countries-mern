require('mongoose'); // Ensure mongoose is in scope

const User = require('../models/user.model');
const Note = require('../models/note.model');

// Abstract away all note controller functions 
// with a single object, NoteControllers.
// This enables "dependency injection" wherever needed.
const NoteControllers = {};

// POST /notes/:username --> Create a note
NoteControllers.createNote = (req, res, next) => {
  console.log('Request to createNote initiated..');
  const note = new Note({
    subject: req.body.subject,
    country: req.body.country,
    stateOrCity: req.body.stateOrCity,
    town: req.body.town,
    content: req.body.content
  });
  console.log(note);
  User
    .find({ _id: req.params.username })
    .exec()
    .then(user => {
      user[0].notes.push(note);
      user[0].save()
      
      return res.status(200).json({
        message: 'Note created and saved successfully.',
        user: user[0]
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err});
    })
} // createNote

// GET /notes --> Retrieve all notes of all users
NoteControllers.fetchAllNotes = (req, res, next) => {
  console.log(`All notes of all users route requested..`);
  User
    .find({})
    .select('_id username notes')
    .exec()
    .then(users => {
      const responses = (users.map(user => {
        if (user.notes.length > 0) {
          return {
            notes: user.notes.map(note => {
              return {
                _id: note._id,
                subject: note.subject,
                country: note.country,
                stateOrCity: note.stateOrCity,
                town: note.town,
                content: note.content,
                view_note: `http://localhost:4001/notes/${user.username}/notes/${note._id}`,
                view_user: `http://localhost:4001/users/${user._id}`,
                all_users: `http://localhost:4001/users`
              }
            }) // user.notes.map
          };
        };
      })) // users.map
      return res.status(200).json(responses.filter(response => response != null));
    }) // then
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err});
    })
} // fetchAllNotes

// GET /notes/:username --> Retrieve all of a user's notes
NoteControllers.fetchAllUserNotes = (req, res, next) => {
  console.log(`All of a user's notes route requested..`);
  User
    .find({ username: req.params.username })
    .select('_id username notes')
    .exec()
    .then(user => {
      console.log(user);
      const response = {
        count: user[0].notes.length,
        username: user[0].username,
        notes: user[0].notes.map(note => {
          return {
            _id: note._id,
            subject: note.subject,
            country: note.country,
            stateOrCity: note.stateOrCity,
            town: note.town,
            content: note.content,
            view_note: `http://localhost:4001/notes/${user[0].username}/notes/${note._id}`,
          };
        }),
        view_user: `http://localhost:4001/users/${user[0]._id}`,
        all_notes: `http://localhost:4001/notes`,
        all_users: `http://localhost:4001/users`
      }; // response

      return res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    })
} // fetchAllUserNotes

// GET /notes/:username/notes/:noteId --> Retrieve a single note of a user
NoteControllers.fetchSingleNote = (req, res, next) => {
  console.log(`>>A single note of a user route requested..`);
  User
    .find({ username: req.params.username })
    .select()
    .exec()
    .then(user => {
      const note = 
        user[0]
          .notes
          .filter(note => {
            // Cast to String to allow deep equality comparison
            return String(note._id) === String(req.params.noteId);
          });
      return res.status(200).json({
        note,
        user_notes:`http://localhost:4001/notes/${user[0].username}`, 
        all_notes: `http://localhost:4001/notes`,
        view_user: `http://localhost:4001/users/${user[0]._id}`,
        all_users: `http://localhost:4001/users`
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err });
    })
} // fetchSingleNote

module.exports = NoteControllers;


/*

->POST     /notes/:username/                    ---done && tested
>>GET      /notes                               ---done && tested
->GET      /notes/:username/                    ---done && tested
->GET      /notes/:username/notes/:noteId       ---done && tested
->PATCH    /notes/:username/notes/:noteId/edit  ---not done && not tested
->DELETE   /notes/:username/notes/:noteId/del   ---not done && not tested

// NoteControllers routes
>>POST     /notes/:username/                    --> Create a note for a user
>>GET      /notes                               --> Retrieve all notes of all users
>>GET      /notes/:username/                    --> Retrieve all of a user's notes
>>GET      /notes/:username/notes/:noteId       --> Retrieve a single note of a user
>>PATCH    /notes/:username/notes/:noteId/edit  --> Edit a note
>>DELETE   /notes/:username/notes/:noteId/del   --> Delete a note

*/
