const express = require('express');
const router = express.Router();

// Route controller
const controller_route_index = require('../controller/controller.route.index');

router.get('/', controller_route_index.root);
router.get('/about', controller_route_index.about);

module.exports = router;