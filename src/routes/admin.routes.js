const express = require("express");
const router = express.Router();

// Route controller
const controller_route_admin = require('../controller/controller.route.admin');

router.post('/admin/api/login', controller_route_admin.admin_api_login);
router.get('/admin/api/logout', controller_route_admin.admin_api_logout);

module.exports = router;