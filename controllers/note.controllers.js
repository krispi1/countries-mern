require('mongoose'); // Ensure mongoose is in scope

const User = require('../models/user.model'); // User model
const Note = require('../models/note.model'); // Note model

// Abstract away all note controller functions 
// with a single object, NoteControllers.
// This enables "dependency injection" wherever needed.
const NoteControllers = {};

// POST /api/notes/:username --> Create a note --> Login required
NoteControllers.createNote = (req, res, next) => {
  console.log('\ncreateNote invoked...');
  
  User
    .find({ username: req.params.username })
    .select('_id username')
    .then(user => {
      const note = new Note({
        userId: user[0]._id,
        username: user[0].username,
        subject: req.body.subject,
        country: req.body.country,
        stateOrCity: req.body.stateOrCity,
        town: req.body.town,
        content: req.body.content
      });

      note
        .save()
        .then(note => res.status(201).json({
          message: 'Note created & saved successfully.',
          note
        }))
        .catch(err => {
          console.log(err);
          return res.status(500).json({
            error: err
          })
        })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err)
    })
} // createNote

// GET /api/notes --> Retrieve all notes for all users
NoteControllers.fetchAllNotes = (req, res, next) => {
  console.log(`\nfetchAllNotes invoked...`);
  
  Note
    .find()
    .select(
      `_id subject country stateOrCity 
      town content userId username`
    )
    .exec()
    .then(notes => {
      const allNotes = [];
      
      notes.map(note => {
        allNotes.push({
          _id: note._id,
          subject: note.subject,
          country: note.country,
          stateOrCity: note.stateOrCity,
          town: note.town,
          content: note.content,
          view_note: `http://localhost:4001/api/notes/${note.username}/${note._id}`,
          user: {
            userId: note.userId,
            username: note.username,
            user_notes: `http://localhost:4001/api/notes/${note.username}`,
            view_user: `http://localhost:4001/api/users/${note.username}`,
          }
        })
      }); // notes.map

      return res.status(200).json({
        count: allNotes.length,
        notes: allNotes,
        all_users: `http://localhost:4001/api/users`
      });
    }) // then
    .catch(err => {
      console.log(err);
      return res.status(500).json(err)
    })
} // fetchAllNotes

// GET /api/notes/:username --> Retrieve all of a user's notes
NoteControllers.fetchAllUserNotes = (req, res, next) => {
  console.log(`\nfetchAllUserNotes invoked...`);
  
  Note
    .find({ username: req.params.username })
    .select(
      `_id subject country stateOrCity 
        town content userId username`
    )
    .exec()
    .then(notes => {
    
      User // Verify username supplied as parameter
        .find({ username: req.params.username })
        .then(user => {
          if (user.length < 1) {
            // Response for when username provided does not exist
            return res.status(500).json({
              message: 'Invalid user!',
              go_home: 'http://localhost:4001',
              all_notes: `http://localhost:4001/api/notes`,
              all_users: `http://localhost:4001/api/users`
            });
          } 
          else {
            const allNotes = notes.map(note => {
              return {
                _id: note._id,
                subject: note.subject,
                country: note.country,
                stateOrCity: note.stateOrCity,
                town: note.town,
                content: note.content,
                view_note: `http://localhost:4001/api/notes/${note.username}/${note._id}`
              } 
            });
            // console.log(Array.isArray(allNotes))

            return allNotes.length < 1 ? (
              // Response for when user does not have any notes yet
              res.status(200).json({
                message: `${req.params.username} doesn't have any notes yet!`,
                more_links: { 
                  view_user: `http://localhost:4001/api/users/${req.params.username}`,
                  all_notes: `http://localhost:4001/api/notes`,
                  all_users: `http://localhost:4001/api/users`
                }
              })
            ) : (
              // Response for when the user has some notes
              res.status(200).json({
                count: allNotes.length,
                notes : allNotes,
                user: {
                  userId: notes[0].userId,
                  username: notes[0].username,
                },
                more_links: { 
                  view_user: `http://localhost:4001/api/users/${req.params.username}`,
                  all_notes: `http://localhost:4001/api/notes`,
                  all_users: `http://localhost:4001/api/users`
                }
              })
            ); // return
          } // else
      }) // then
      .catch(err => {
        return res.status(500).json({
          error: err,
          go_home: 'http://localhost:4001',
          all_notes: `http://localhost:4001/api/notes`,
          all_users: `http://localhost:4001/api/users`
        })
      })

    }) // then
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err,
        go_home: 'http://localhost:4001',
        all_notes: `http://localhost:4001/api/notes`,
        all_users: `http://localhost:4001/api/users`
      })
    })
} // fetchAllUserNotes

// GET /api/notes/:username/:noteId --> Retrieve a single note for a user
NoteControllers.fetchSingleNote = (req, res, next) => {
  console.log(`\nfetchSingleNote invoked...`);

  Note
    .find({ _id: req.params.noteId })
    .select(
      `_id subject country stateOrCity 
      town content user userId username`)
    .exec()
    .then(note => {
      return res.status(200).json({
        // note is an array with one item so we grab it with index 0
        _id: note[0]._id,
        subject: note[0].subject,
        country: note[0].country,
        stateOrCity: note[0].stateOrCity,
        town: note[0].town,
        content: note[0].content,
        user: {
          userId: note[0].userId,
          username: note[0].username
        },
        more_links: {
          user_notes: `http://localhost:4001/api/notes/${req.params.username}`,
          all_notes: `http://localhost:4001/api/notes`,
          view_user: `http://localhost:4001/api/users/${req.params.username}`,
          all_users: `http://localhost:4001/api/users`
        }
      }); // return
    }) // then
    .catch(err => {
      console.log(err);
      return res.status(500).json(err)
    })
} // fetchSingleNote

// PATCH /api/notes/:username/:noteId/edit --> Edit a note --> Login required
NoteControllers.editNote = (req, res, next) => {
  console.log(`\neditNote invoked...`);

  Note
    .findById({ _id: req.params.noteId })
    .select('subject country stateOrCity town content')
    .exec()
    .then(note => {
      // Prevent overwriting what we already have in the database
      // with a null value just in case no value is provided
      // for any given field (fields left blank upon submission)
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
    }) // then
    .catch(err => {
      console.log(err);
      return res.status(500).json(err)
    })
} // editNote

// DELETE /api/notes/:username/:noteId/del --> Delete a note --> Login required
NoteControllers.deleteNote = (req, res, next) => {
  console.log(`\neditNote invoked...`);
  
  Note
    .remove({ _id: req.params.noteId })
    .exec()
    .then(result => {
      return res.status(200).json({
        message: 'Note deleted!!',
        more_links: {
          my_notes: `http://localhost:4001/api/notes/${req.params.username}`,
          all_notes: `http://localhost:4001/api/notes`,
          my_page: `http://localhost:4001/api/users/${req.params.username}`,
          all_users: `http://localhost:4001/api/users`,
          go_home: 'http://localhost:4001'
        }
      })
    }) // then
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err,
        go_home: 'http://localhost:4001',
        all_notes: `http://localhost:4001/api/notes`,
        all_users: `http://localhost:4001/api/users`
      })
    })  
} // deleteNote

module.exports = NoteControllers;


/*

->POST     /api/notes/:username               ---done && tested
->GET      /api/notes                         ---done && tested
->GET      /api/notes/:username               ---done && tested
->GET      /api/notes/:username/:noteId       ---done && tested
->PATCH    /api/notes/:username/:noteId/edit  ---done && tested
->DELETE   /api/notes/:username/:noteId/del   ---done && tested

// NoteControllers routes & handler functions

Method   Route                           Function             Purpose

POST     /api/notes/:username                createNote           Create a note for a user
GET      /api/notes                          fetchAllNotes        Retrieve all notes for all users
GET      /api/notes/:username                fetchAllUserNotes    Retrieve all of a user's notes
GET      /api/notes/:username/:noteId        fetchSingleNote      Retrieve a single note for a user
PATCH    /api/notes/:username/:noteId/edit   editNote             Edit a note
DELETE   /api/notes/:username/:noteId/del    deleteNote           Delete a note

// console.log(NoteControllers)
// {
//   createNote: [Function],
//   fetchAllNotes: [Function],
//   fetchAllUserNotes: [Function],
//   fetchSingleNote: [Function],
//   editNote: [Function],
//   deleteNote: [Function]
// }


*/
