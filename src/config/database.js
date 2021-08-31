/**
 * -----------------------------------------------------------------------
 * Mongoose config to connect to MongoDB
 * -----------------------------------------------------------------------
 */
const env = require('./env');
const mongoose = require("mongoose");
const MONGODB_URI = env.MONGODB_CONNECTION_STRING;

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => console.log("MongoDB connected to", db.connection.host))
    .catch((err) => console.log(err));

module.exports = mongoose;
