const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username : {type: mongoose.Schema.Types.String, ref: 'User'},
    subject: { type: String, required: true },
    country: { type: String, required: true },
    stateOrCity: { type: String, required: false },
    town: { type: String, required: false },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
