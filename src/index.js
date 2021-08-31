const app = require("./server");
require('./config/database');

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}.`);
});
