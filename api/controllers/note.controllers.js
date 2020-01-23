require('mongoose'); // Ensure mongoose is in scope

const User = require('../models/user.model');
const Note = require('../models/note.model');

const NoteControllers = {};

// POST /users/:userId/notes --> Create a note
NoteControllers.createNote = (req, res, next) => {
  const note = new Note({
    subject: req.body.subject,
    country: req.body.country,
    stateOrCity: req.body.stateOrCity,
    town: req.body.town,
    content: req.body.content
  });

  User
    .find({ _id: req.params.userId })
    .exec()
    .then(user => {

    })
    .catch()
} // createNote

module.exports = NoteControllers;

/*

->POST       /users/:userId/notes               ---not done && not tested
->GET        /users/:userId/notes               ---not done && not tested
->GET        /users/:userId/notes/:noteId       ---not done && not tested
->PATCH      /users/:userId/notes/:noteId/edit  ---not done && not tested
->DELETE     /users/:userId/notes/:noteId/del   ---not done && not tested

*/
