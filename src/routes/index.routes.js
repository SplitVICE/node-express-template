const express = require('express');
const router = express.Router();
const path = require("path");
const env = require("../config/env");

router.get('/', (req, res) => {
    const hbsParams = {
        adminPassword: env.ADMIN_PASSWORD,
        adminAuthenticated: req.session.adminAuthenticated
    };
    res.render("index", { hbsParams: hbsParams });
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/about.html"));
});

module.exports = router;