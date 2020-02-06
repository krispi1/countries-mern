const router   = require('express').Router();

const isLoggedIn = require('../middleware/check-auth');

// NC --> NoteControllers
const NC = require('../controllers/note.controllers');

// POST /api/notes/:username --> Create a note for a user --> Login required
router.post('/:username', isLoggedIn, NC.createNote);

// GET /api/notes --> Fetch all the notes of all users
router.get('/', NC.fetchAllNotes);

// GET /api/notes/:username --> Fetch all of a user's notes
router.get('/:username', NC.fetchAllUserNotes);

// GET /api/notes/:username/:noteId --> Fetch a single note for a user
router.get('/:username/:noteId', NC.fetchSingleNote);

// PATCH /api/notes/:username/:noteId/edit --> Edit a note --> Login required
router.patch('/:username/:noteId/edit', isLoggedIn, NC.editNote);

// DELETE /api/notes/:username/:noteId/del --> Delete a note --> Login required
router.delete('/:username/:noteId/del', isLoggedIn, NC.deleteNote);

module.exports = router;


/*

// NoteControllers routes
POST     /api/notes/:username                --> Create a note for a user
GET      /api/notes/:username                --> Retrieve a user's notes
GET      /api/notes/:username/:noteId        --> Retrieve a single note for a user
PATCH    /api/notes/:username/:noteId/edit   --> Edit a note
DELETE   /api/notes/:username/:noteId/del    --> Delete a note

*/
