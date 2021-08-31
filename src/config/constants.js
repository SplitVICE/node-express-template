const path = require('path');

module.exports = {
    views: {
        index: path.join(__dirname, '../views/index.html'),
        about: path.join(__dirname, '../views/about.html'),
    }
};