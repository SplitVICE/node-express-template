require("../config/database");
const { Schema, model } = require("mongoose");

const person = new Schema({
    name:       { type: String, required: true },
    contact:    { type: String, required: true },
    note:       { type: String, required: false }
});

module.exports = model('person', person);