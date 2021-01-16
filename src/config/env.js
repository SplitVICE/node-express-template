/**
 * ---------------------------------------------------------------------------------------
 * Environment variables reading module.
 * ---------------------------------------------------------------------------------------
 */
require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 4000,
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}