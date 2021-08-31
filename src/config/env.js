/**
 * ---------------------------------------------------------------------------------------
 * Environment variables reading
 * ---------------------------------------------------------------------------------------
 */
require('dotenv').config();
module.exports = {
    // All variables are still properly set if .env is missing
    PORT: process.env.PORT || 2600,
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false',
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET || 'SECRET',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'password'
}