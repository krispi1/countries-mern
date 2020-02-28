/*

edit_note: {
  method: "PATCH",
  url: "/api/notes/:username/:noteId/edit",
  require_login: true
}

// Note model
{
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username : {type: mongoose.Schema.Types.String, ref: 'User'},
  subject: { type: String, required: true },
  country: { type: String, required: true },
  stateOrCity: { type: String, required: false },
  town: { type: String, required: false },
  content: { type: String, required: true },
}

*/
