const express = require('express');
const express_session = require('express-session');
const path = require('path');
const env = require('./config/env');
const cors = require('cors');

const app = express();

// SERVER SETTINGS
app.set('port', env.PORT); // Use .evn set PORT or port 4000 if does not exist

// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public'))); // public folder
app.use(express.json()); // Server understands JSON
app.use(cors()); // accepts cors from all domains
const express_session_settings = {
  secret: env.EXPRESS_SESSION_SECRET,
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // makes changes on session even though if the session does not exist yet; so it is created
  cookie: {
    maxAge: 600000, // milliseconds. 600000 => 10 minutes
    secure: false, // work only on HTTPS
    httpOnly: true // Only readable via HTTP/S protocol. true is recommended
  }
}
app.use(express_session(express_session_settings));

// ROUTES
app.use(require('./routes/index.routes'));
app.use(require('./routes/admin.routes'));

module.exports = app;