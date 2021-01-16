const express = require("express");
const router = express.Router();
var path = require('path');

const { adminLogin } = require('../controller/admin.controller');

router.post('/admin/api/login', (req, res) => { // Admin login action.
    const result = adminLogin(req.body);
    if (result.status == "success" && result.description == "password correct") {
        req.session.adminAuthenticated = true;
        res.json(result);
    } else {
        req.session.adminAuthenticated = false;
        res.json(result);
    }
});

router.get('/admin/api/logout', (req, res) => {
    delete req.session.adminAuthenticated;
    res.redirect("/");
});

module.exports = router;