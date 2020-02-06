require('mongoose'); // Ensure mongoose is in scope

const User = require('../models/user.model'); // User model
const Endpoint = require('../models/endpoint.model'); // Endpoint model

// Abstract away all note controller functions 
// with a single object, APIControllers.
// This enables "dependency injection" wherever needed.
const APIControllers = {};


