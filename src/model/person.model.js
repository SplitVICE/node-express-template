/**
 * ---------------------------------------------------------------------
 * person schema. A model template example.
 * ---------------------------------------------------------------------
 */
require("../config/database");
const { Schema, model } = require("mongoose");

const contact_infoSchema = new Schema({
    type: { type: String, required: true }, // Example: email
    detail: { type: String, required: true } // Example: vice@mail.com
});

const person = new Schema({
    name: { type: String, required: true, default: "Joe Doe" },
    addresses: { type: [String], required: false },
    contact_info: { type: [contact_infoSchema], required: false },
    note: { type: String, required: false }
});

/**
 * JavaScript object notation equivalent:
{
 _id: String -> MongoDB object,
 name: String,
 addresses: [String],
 contact_info: [{ type: String, detail: String }]
 note: String
}
*/

module.exports = model('person', person);