require('dotenv').config();

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const logger     = require('morgan');

// Custom routers
// const exercisesRouter = require('./routes/exercises');
// const usersRouter     = require('./routes/users');

// Global app constants
const app        = express();
const PORT       = process.env.PORT || 4001;

// Suppress mongoose errors globally
// https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat

// Set up db and connect to it
mongoose.Promise = global.Promise;
const dbURI = process.env.DB_URI;
const dbOPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(dbURI, dbOPTIONS, err => {
  // if (err) console.error(err.stack || err);
  console.log("Connected to DB..\n");
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger('tiny'));
///////////////////////////////////
// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

// Invoke server
app.listen(PORT, () => {
  console.log(`\nServer running on port ${PORT}`)
});



