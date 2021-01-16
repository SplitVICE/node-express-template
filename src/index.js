const app = require("./server"); // ExpressJS app export.
require('./config/database'); // Initiates the database connection and maintains it open.

// Server start.
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}.`);
});
