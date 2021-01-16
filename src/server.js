// *** Module requirements.
const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser')
const env = require('./config/env');

// *** Initializations.
const app = express();

// *** Server settings.
app.set('views', path.join(__dirname, 'views')); // Views folder set.
app.set('port', env.PORT || 4000);
app.engine('.hbs', exphbs({
  defaultLayout: "main",
  extname: '.hbs',
  helpers: require("./libs/handlebars_helpers")
}));
app.set('view engine', '.hbs');

// *** Middlewares.
app.use(express.urlencoded({ extended: false })); // No complex files understanding like images.
app.use(express.static(path.join(__dirname, 'public'))); // Public files folder path route set.
app.use(express.json()); // Server understands JSON.
app.use(function (req, res, next) { // Accepts API requests from selected domains.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const sessionSettings = {
  secret: env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600000, // milliseconds.
    secure: false, // Work only on HTTPS.
    httpOnly: true // Only readable via HTTP/S protocol.
  }
}
app.use(session(sessionSettings));
app.use(cookieParser());

// *** Routes.
app.use(require('./routes/index.routes'));
app.use(require('./routes/person.routes'));
app.use(require('./routes/admin.routes'));

module.exports = app;