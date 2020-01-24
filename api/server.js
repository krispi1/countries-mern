require('dotenv').config(); // Set up app environment

// Modules
const express       = require('express');
const mongoose      = require('mongoose');
const cors          = require('cors');
const logger        = require('morgan');

// Custom routers
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
      console.log("Connected to DB..\n");
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
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// Routes
app.get('/', (req, res) => res.send({
  Welcome: "We are glad you are here.",
  users: 'http://localhost:4001/users'
}));


// Fallback error handler for 404 page-not-found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Default error handler
app.use((error, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});

// Invoke server
app.listen(PORT, () => {
  connectToDB(dbURI);
  console.log(`\nServer running on port ${PORT}`)
});
