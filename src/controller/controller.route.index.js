const path = require("path");
const constants = require('../config/constants');
const controller = {};

controller.root = (req, res) => {
    res.sendFile(constants.views.index);
};

controller.about = (req, res) => {
    res.sendFile(constants.views.about);
};

module.exports = controller;