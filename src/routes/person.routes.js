const express = require('express');
const router = express.Router();

// Controller.
const controller_route_person = require('../controller/controller.route.person');

router.get('/person', controller_route_person.person);
router.get('/person/edit', controller_route_person.person_edit);
router.get('/person/add', controller_route_person.person_add);

// API routes

router.get('/api/person/createtemplates', controller_route_person.api_person_createtemplates);
router.post('api/person', controller_route_person.api_person_post);
router.put('/api/person/', controller_route_person.api_person_put);
router.delete('/api/person/', controller_route_person.api_person_delete);
router.delete('/api/person/all', controller_route_person.api_person_all_delete);

module.exports = router;