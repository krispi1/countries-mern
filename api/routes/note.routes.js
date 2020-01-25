const router   = require('express').Router();

const isLoggedIn = require('../middleware/check-auth');

// NC --> NoteControllers
const NC = require('../controllers/note.controllers');

// POST --> Create a note for a user
router.post('/:username', NC.createNote);

// GET --> Fetch all notes of all users
router.get('/', NC.fetchAllNotes);

// GET --> Fetch all of a user's notes
router.get('/:username', NC.fetchAllUserNotes);

// GET --> Fetch a single note of a user
router.get('/:username/notes/:noteId', NC.fetchSingleNote);

// PATCH --> Edit a user's note
// router.patch('/:username/notes/:noteId/edit', isLoggedIn, NC.editNote);

// DELETE --> Delete a user's note
// router.delete('/:username/notes/:noteId/del', isLoggedIn, NC.deleteNote);

module.exports = router;


/*

// NoteControllers routes
>>POST     /notes/:username/                    --> Create a note for a user
>>GET      /notes/:username/                    --> Retrieve a user's notes
>>GET      /notes/:username/notes:noteId        --> Retrieve a single note for a user
>>PATCH    /notes/:username/notes/:noteId/edit  --> Edit a note
>>DELETE   /notes/:username/notes/:noteId/del   --> Delete a note


*/
