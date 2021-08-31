const express = require("express");
const router = express.Router();

// Route controller
const controller = require('../controller/controller.route.admin');

// API ROUTES

router.post('/api/admin/login', controller.api_admin_login);
router.get('/api/admin/isAuth', controller.api_admin_isAuth);
router.get('/api/admin/logout', controller.adi_admin_logout);

module.exports = router;