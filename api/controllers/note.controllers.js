require('mongoose'); // Ensure mongoose is in scope

const User = require('../models/user.model'); // User model
const Note = require('../models/note.model'); // Note model

// Abstract away all note controller functions 
// with a single object, NoteControllers.
// This enables "dependency injection" wherever needed.
const NoteControllers = {};

// POST /notes/:username --> Create a note
NoteControllers.createNote = (req, res, next) => {
  console.log('\ncreateNote invoked...');
  
  User
    .find({ username: req.params.username })
    .select('_id')
    .then(user => {
      const note = new Note({
        user: user[0]._id,
        subject: req.body.subject,
        country: req.body.country,
        stateOrCity: req.body.stateOrCity,
        town: req.body.town,
        content: req.body.content
      });

      note
        .save()
        .then(note => res.status(200).json({
          message: 'Note created & saved successfully.',
          note
        }))
        .catch(err => {
          console.log(err);
          return res.status(500).json({
            error: err
          })
        })
      return;
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err)
    })
} // createNote

// GET /notes --> Retrieve all notes for all users
NoteControllers.fetchAllNotes = (req, res, next) => {
  console.log(`\nfetchAllNotes invoked...`);
  Note
    .find()
    .select('_id subject country stateOrCity town content user')
    .exec()
    .then(notes => {

      return res.status(200).json(
        notes.map(note => {
          return {
            _id: note._id,
            subject: note.subject,
            country: note.country,
            stateOrCity: note.stateOrCity,
            town: note.town,
            content: note.content,
            user: note.user,
            more_links: { 
              view_user: `http://localhost:4001/users/${note.user}`
            }
          }
        })
      );
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err)
    })
} // fetchAllNotes

// GET /notes/:username --> Retrieve all of a user's notes
NoteControllers.fetchAllUserNotes = (req, res, next) => {
  console.log(`\nfetchAllUserNotes invoked...`);
  User
    .find({ username: req.params.username })
    .select('_id username')
    .then(user => {

      Note
        .find({ user: user[0]._id })
        .select('_id subject country stateOrCity town content user')
        .exec()
        .then(notes => {
          const userNotes = notes.map(note => {
            return {
              _id: note._id,
              subject: note.subject,
              country: note.country,
              stateOrCity: note.stateOrCity,
              town: note.town,
              content: note.content,
              user: note.user
            }
          })
          return res.status(200).json({
            notes: userNotes,
            more_links: {
              all_notes: `http://localhost:4001/notes`,
              view_user: `http://localhost:4001/users/${user[0].username}`,
              all_users: `http://localhost:4001/users`
            }
          });
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json(err)
        })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err)
    })
} // fetchAllUserNotes

// GET /notes/:username/notes/:noteId --> Retrieve a single note for a user
NoteControllers.fetchSingleNote = (req, res, next) => {
  console.log(`\nfetchSingleNote invoked...`);
  Note
    .find({ _id: req.params.noteId })
    .select('_id subject country stateOrCity town content user')
    .exec()
    .then(note => {
      console.log(note);
      return res.status(200).json({
        note,
        more_links: {
          user_notes: `http://localhost:4001/notes/${req.params.username}`,
          all_notes: `http://localhost:4001/notes`,
          view_user: `http://localhost:4001/users/${req.params.username}`,
          all_users: `http://localhost:4001/users`
        }
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err)
    })
} // fetchSingleNote

// PATCH /notes/:username/notes/:noteId/edit --> Edit a note
NoteControllers.editNote = (req, res, next) => {
  console.log(`\neditNote invoked...`);
  Note
    .findById({ _id: req.params.noteId })
    .select('subject country stateOrCity town content')
    .exec()
    .then(note => {
      // Avoid null assignment to blank fields
      note.subject = req.body.subject ?
        req.body.subject : note.subject;
      note.country = req.body.country ?
        req.body.country : note.country;
      note.stateOrCity = req.body.stateOrCity ?
        req.body.stateOrCity : note.stateOrCity;
      note.town = req.body.town ?
        req.body.town : note.town;
      note.content = req.body.content ?
        req.body.content : note.content;

      note
        .save()
        .then(updatedNote => {
          return res.status(200).json({
            message: 'Note updated',
            updatedNote
          });
        })
        .catch(err => res.status(400).json({ error: err }))
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err)
    })
} // editNote

// DELETE /notes/:username/notes/:noteId/del --> Delete a note
NoteControllers.deleteNote = (req, res, next) => {
  console.log(`\neditNote invoked...`);
  Note
    .remove({ _id: req.params.noteId })
    .exec()
    .then(result => {
      return res.status(200).json({
        message: 'Note deleted!!',
        more_links: {
          all_notes: `http://localhost:4001/notes`,
          view_user: `http://localhost:4001/users/${req.params.username}`,
          all_users: `http://localhost:4001/users`
        }
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err,
        go_home: 'http://localhost:4001'  
      })
    })  
} // deleteNote

module.exports = NoteControllers;



/*

->POST     /notes/:username/                    ---done && tested
->GET      /notes                               ---done && tested
->GET      /notes/:username/                    ---done && tested
->GET      /notes/:username/notes/:noteId       ---done && tested
->PATCH    /notes/:username/notes/:noteId/edit  ---done && tested
->DELETE   /notes/:username/notes/:noteId/del   ---done && tested

// NoteControllers routes & handler functions

Method   Route                                 Function             Purpose

POST     /notes/:username/                     createNote           Create a note for a user
GET      /notes                                fetchAllNotes        Retrieve all notes for all users
GET      /notes/:username/                     fetchAllUserNotes    Retrieve all of a user's notes
GET      /notes/:username/notes/:noteId        fetchSingleNote      Retrieve a single note for a user
PATCH    /notes/:username/notes/:noteId/edit   editNote             Edit a note
DELETE   /notes/:username/notes/:noteId/del    deleteNote           Delete a note

*/
