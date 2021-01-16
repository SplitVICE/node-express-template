const personController = {};
const personModel = require("../model/person.model");

/**
 * -------------------------------------------------------
 * Plain JavaScript object conversion.
 * Handlebars requires plain JavaScript objects to render them properly 
 * on HTML outputs. Mongoose's module.find() returns a Mongoose object.
 * To return a plain JavaScript object you can use module.find().lean().
 * -------------------------------------------------------
*/

/**
 * Returns all person registries on the Database.
 * @param { Boolean } lean If true, returns person
 * registries as JavaScript plain object.
*/
personController.read = async lean => {
    const response = await personModel.find().lean(lean);
    if (response.length == 0)
        return { status: "success", description: "no documents stored" };
    return response;
};

/**
 * Returns specific person registries by given model.name parameter.
 * @param { Object } params Required parameters to find a person registry by name.
 * @param params.name Name of the registry to look for. Required: yes.
 * @param { Boolean } lean If true, returns person documents as JavaScript
 * plain object.
*/
personController.readByName = async (params, lean) => {
    if (params.name == undefined) // id parameter not given.
        return { status: "failed", description: "missing name" };

    // Uses Regex expression to find matches that contain given letters and ignores case sensitiveness.
    const document = await personModel
        .find({ name: { "$regex": new RegExp("^.*" + params.name.toLowerCase() + ".*", "i") } }).lean(lean);

    if (document.length == 0) // Document not found.
        return { status: "failed", description: "document not found" };

    return document; // Document found.
};

/**
 * Returns person document by given MongoDB id.
 * @param { String } id Person document _id.
 * @param { Boolean } lean If true, returns document as JavaScript plain object.
 */
personController.readById = async (id, lean) => {
    const document = await personModel.findById(id).lean(lean);
    if (document == null) {
        return { status: "failed", description: "user not found" };
    } else
        return document
};

/**
 * Adds a new person registry on database.
 * @param { Object } params Required parameters to create a new person registry.
 * @param params.name Name of the registry to save. Required: yes.
 * @param params.addresses[] List of addresses. Required: no.
 * @param params.contact_info[] List of contact info objects. Required: no.
 * @param params.contact_info[].type The type of contact information.
 * @param params.contact_info[].detail The detail info of the contact information.
 * @param params.note Note of the registry. Required: no.
 */
personController.add = async params => {
    if (params.name == undefined)
        return { status: "failed", description: "name not given" };

    const newPerson = {
        name: params.name,
        addresses: params.addresses,
        contact_info: params.contact_info,
        note: params.note
    }

    return await personModel.create(newPerson);
};

/**
 * Edits a person registry on the database.
 * @param { Object } filter MongoDB filter alike to find the document to update.
 * @param { Object } doc contains the fields to update on the registry.
 * Recommended filter:
 * { _id: person_document_id } 
 */
personController.edit = async (filter, doc) => {
    const result = await personModel.updateOne(filter, doc);
    if (result.nModified >= 1)
        return { status: "success", description: "record updated" };
    else
        return { status: "failed", description: "record update failed" };
};

/**
 * Deletes a person registry on the database.
 * Recommended filter:
 * { _id: person_document_id }
 * @param { Object } filter MongoDB filter syntax to find required document.
 */
personController.delete = async filter => {
    const result = await personModel.deleteOne(filter);
    if (result.deletedCount >= 1)
        return { status: "success", description: "record deleted" };
    else
        return { status: "failed", description: "record delete failed" };
};

/**
 * -------------------------------------------------
 * Nested objects controllers.
 * -------------------------------------------------
 */

/**
 * Adds a new contact_info subdocument into an existing person document.
 * @param { Object } filter MongoDB filter syntax to find required document.
 * @param { Object } contactInfo contact_info subdocument fields.
 * @param contactInfo.type type field. Example: email Required: yes.
 * @param contactInfo.detail detail field. Example: vice@mail.com Required: yes.
 */
personController.add_contactInfo = async (filter, contactInfo) => {
    const result = await personModel.updateOne(filter, { $push: { contact_info: contactInfo } });
    if (result.nModified == 1) {
        return { status: "success", description: "contact info added" }
    } else {
        return { status: "failed", description: "contact info add failed" }
    }
}

/**
 * Edits an existing contact_info subdocument fields.
 * @param { Object } filter parameters to find person document to push new subdocument.
 * @param filter._id Person document id.
 * @param filter._id_contact_info contact_info subdocument id.
 * @param { Object } contactInfo contact_info subdocument fields.
 * @param contactInfo.type type field. Example: email Required: yes.
 * @param contactInfo.detail detail field. Example: vice@mail.com Required: yes.
 */
personController.edit_contactInfo = async (filter, contactInfo) => {
    const result = await personModel.updateOne(
        { _id: filter._id, "contact_info._id": filter._id_contact_info },
        {
            $set: {
                "contact_info.$.detail": contactInfo.type,
                "contact_info.$.detail": contactInfo.detail
            }
        });
    if (result.nModified == 1) {
        return { status: "success", description: "contact info modified" }
    } else {
        return { status: "failed", description: "contact info modification failed" }
    }
}

/**
 * @param {*} filter MongoDB filter syntax to find required document.
 * @param {*} contactInfo 
 */
personController._delete_contactInfo = async (filter, contactInfo) => {
    const result = await personModel.updateOne(filter, { $pull: { "contact_info": contactInfo } });
    if (result.nModified == 1) {
        return { status: "success", description: "contact info record deleted" };
    } else {
        return { status: "failed", description: "contact info record deleted failed" }
    }
}

/**
 * Deletes a contact_info subdocument.
 * @param { Object } payload Object that contains the data to delete a contact_info subdocument.
 * @param _id Person's _id document.
 * @param _id_contact_info contact_info's _id subdocument.
 */
personController.delete_contactInfo = async (payload) => {
    const result = await personModel.updateOne({ _id: payload._id },
        { $pull: { "contact_info": { _id: payload._id_contact_info } } });
    if (result.nModified == 1) {
        return { status: "success", description: "contact info record deleted" };
    } else {
        return { status: "failed", description: "contact info record deleted failed" }
    }
}

/**
 * -------------------------------------------------------
 * Handlebars helper functions.
 * -------------------------------------------------------
 */
personController.handlebars_helpers = {
    statusMessageRendering: (status, description) => {
        let response = "";
        if (status == "failed" &&
            description == "missing name") {
            response =
                `
            <div class="alert alert-warning" role="alert">
                Name to search not provided
            </div>
            `;
        }

        if (status == "failed" &&
            description == "document not found") {
            response =
                `
            <div class="alert alert-warning" role="alert">
                Person registry not found
            </div>
            <a href="/person">Cancel search.</a>
            `;
        }

        if (status == "success" &&
            description == "no documents stored") {
            response =
                `
            <div class="h5">
                No person documents stored
            </div>
            `;
        }
        return response;
    },
    renderSearchBar: description => {
        if (description != "no documents stored") {
            return `
            <div class="input-group mb-3">
                <input id="searchInput" type="text" class="form-control" placeholder="Person name" autofocus>
                <div class="input-group-append">
                    <button class="btn btn-outline-primary" id="btn_search" type="button">Search</button>
                </div>
            </div>
            `
        }
    }
};

personController.handlebars_helpers_edit = {
    
};

/**
 * -------------------------------------------------------
 * Template registries creation.
 * -------------------------------------------------------
 */

// Creates template registries.
personController.createTemplateRegistries = async () => {
    /**
     * -----------------------
     * Template person objects.
     * -----------------------
    */
    const personTemplate1 = {
        name: "Joe Doe",
        addresses: ["Street 38273847", "Street 9EE3828"],
        contact_info: [
            {
                type: "Email",
                detail: "joedoe@mail.com"
            },
            {
                type: "Phone",
                detail: "847983479534"
            }
        ],
        note: "Joe Doe is a lorem person registry."
    };

    const personTemplate2 = {
        name: "Jane Dome",
        addresses: [],
        contact_info: [],
        note: ""
    };

    const personTemplate3 = {
        name: "Chuck Inke",
        addresses: ["Street 0001929", "Street AES256123"],
        contact_info: [
            {
                type: "Email",
                detail: "chuckinke@mail.com"
            },
            {
                type: "Phone",
                detail: "9389283"
            }
        ],
        note: "He is a cool guy."
    };

    const personTemplate4 = {
        name: "Just VICE",
        addresses: ["Street 77777"],
        contact_info: [
            {
                type: "Website",
                detail: "justvice.github.io"
            },
        ],
        note: "This person likes cookies."
    };

    const personTemplate5 = {
        name: "Inki Ponko",
        addresses: ["?"],
        note: "This dude is usually hiding somewhere."
    };

    const personTemplateArray = [
        personTemplate1,
        personTemplate2,
        personTemplate3,
        personTemplate4,
        personTemplate5
    ]

    /**
     * --------------------------------------
     * If registries do not exist, create them.
     * --------------------------------------
    */
    const addingAndCheckProcess = async (personTemplate, registryNumber) => {
        const response = await personController.readByName(personTemplate);
        if (response.status == "failed" &&
            response.description == "document not found") {
            await personController.add(personTemplate);
            console.log(`Template person registry ${registryNumber} created.`);
        }
    }

    for (let i = 0; i < personTemplateArray.length; i++) {
        const element = personTemplateArray[i];
        addingAndCheckProcess(element, i + 1);
    }

    return { status: "success", description: "process done" };
};

module.exports = personController;