const env = require("../config/env");
const path = require("path");
const personController = require("../controller/controller.model.person");
const controller_route_person = {};

//Renders all person registries.
controller_route_person.person = async (req, res) => {
    let response = {};
    response.adminAuthenticated = req.session.adminAuthenticated;

    if (req.query.search) { // A search for a document was done.
        const nameToSearch = { name: req.query.search };
        const readByNameResponse = await personController.readByName(nameToSearch, true);
        if (readByNameResponse.status) {
            response.status = readByNameResponse.status;
            response.description = readByNameResponse.description;
        } else
            response.people = readByNameResponse;
        response.searchPerformed = true;
    } else { // Bring all documents - no search by name was done.
        const readResponse = await personController.read(true);
        if (readResponse.status) {
            response.status = readResponse.status;
            response.description = readResponse.description;
        } else
            response.people = readResponse;
    }

    res.render('person/index',
        {
            response: response,
            layout: "person",
            helpers: personController.handlebars_helpers
        });
};

// To edit a registry.
controller_route_person.person_edit = async (req, res) => {
    const response = {};
    if (
        //req.session.adminAuthenticated === true &&
        req.query.id) {
        const result = await personController.readById(req.query.id, true);
        if (result.status) {
            response.status = result.status;
            response.description = result.description;
        } else
            response.document = result;
        console.log(response)
        res.render("person/edit",
            {
                response: response,
                helpers: personController.handlebars_helpers_edit
            });
    } else {
        console.log("forbidden");
        res.redirect("/person");
    }
};

// Adds a new person document in the database.
controller_route_person.person_add = async (req, res) => {
    const response = {};
    if (
        //req.session.adminAuthenticated === true
        true) {
        res.render("person/add");
    } else {
        console.log("forbidden");
        res.redirect("/person");
    }
};


// Creates templates of person documents.
controller_route_person.api_person_createtemplates = async (req, res) => {
    const response = await personController.createTemplateRegistries();
    res.json(response);
};


// Adds a new person document though API
controller_route_person.api_person_post = async (req, res) => {
    let response = undefined;
    if (req.session.adminAuthenticated === true)
        response = await personController.add(req.body);
    else
        response = { status: "failed", description: "authentication required" };

    res.json(response);
};

// To update a person document though API.
controller_route_person.api_person_put = async (req, res) => {
    res.render('./layouts/home');
};

// Deletes a person document though API.
controller_route_person.api_person_delete = async (req, res) => {
    if (req.session.adminAuthenticated === true) {
        const response = await personController.delete(req.body);
        res.json(response);
    } else
        res.json({ status: "failed", description: "authentication required" })
};

// To delete all person registries though API.
// Requires admin authentication.
controller_route_person.api_person_all_delete = async (req, res) => {
    // AUNTHENTICATION REQUIRED
    console.log(req.body);
    //const response = personController.delete(req.body);
    res.json({});
};



module.exports = controller_route_person;