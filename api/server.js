require('dotenv').config(); // Set up app environment

// Modules
const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
const logger        = require('morgan');

// Custom routers
const notesRouter   = require('./routes/note.routes');
const usersRouter   = require('./routes/user.routes');
const authRouter    = require('./routes/auth.routes');

// Global app constants
const app           = express();
const PORT          = process.env.PORT || 4001;

// Suppress mongoose errors globally
// https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat

// Set up db options
mongoose.Promise = global.Promise;
const dbURI = process.env.DB_URI;
const dbOPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// Decouple DB connection
function connectToDB(dbURI) {
  return mongoose.connect(dbURI, dbOPTIONS)
    .then(() => {
      console.log("✔ Connected to DB..\n");
      return mongoose.connection;
    })
    .catch(err => console.error(
      `DB connection error: ${err.stack || err}`
    ))
} // connectToDB

 // Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger('tiny'));
app.use('/notes', notesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// Handle root route
app.get('/', (req, res) => res.send({
  message: "Welcome.",
  users: 'http://localhost:4001/users'
}));

// Fallback error handler for 404 page-not-found
app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404).json({
    message: "We couldn't find that page. Here are some links",
    go_home: 'http://localhost:4001',
    users: 'http://localhost:4001/users',
    log_in: 'http://localhost:4001/auth/login',
    sign_up: 'http://localhost:4001/auth/signup',
  });
  next(error);
});

// Default error handler (must be placed after all others)
app.use((error, res, next) => {
  res
    .status(error.status || 500)
    .json({ error: error.message })
});

// Invoke server
app.listen(PORT, () => {
  connectToDB(dbURI);
  console.log(`\n✔ Server running on port ${PORT}`)
});
