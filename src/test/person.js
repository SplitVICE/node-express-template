/*
 * -----------------------------------------
 * person.controller.js tests.
 * -----------------------------------------
*/
const { AssertionError } = require('assert');
var assert = require('assert');
const { Console } = require('console');
const personController = require("../controller/person.controller");

describe("PERSON SCHEMA TESTS", () => {

    const testSettings = {
        run_personSchemaTest: true,
        run_person_contactInfoSchemaTest: true
    };

    if (testSettings.run_personSchemaTest) {
        const newPerson1 = {
            name: "Joe Dome",
            addresses: ["Address 1", "Address 2"],
            contact_info: [
                {
                    type: "phone",
                    detail: "8237482374832"
                },
                {
                    type: "email",
                    detail: "joedome@mail.com"
                }
            ],
            note: "Registry 1 note"
        };

        const newPerson2 = {
            name: "Jane Doe",
            addresses: ["Address 3", "Address 4"],
            contact_info: [
                {
                    type: "phone",
                    detail: "292973872213"
                },
                {
                    type: "email",
                    detail: "janedoe@mail.com"
                }
            ],
            note: "Registry 2 note."
        };

        const newPerson3 = {
            name: "Joe Dome", // Same name as newPerson1
            addresses: ["Address 5", "Address 6"],
            contact_info: [
                {
                    type: "Work phone",
                    detail: "290392193892"
                }
            ],
            note: "Registry 3 note."
        };

        const newPersonEditable = {
            name: "Dale Jones",
            addresses: ["Address 7", "Address 8"],
            contact_info: [
                {
                    type: "email",
                    detail: "dalejones@mail.com"
                }
            ],
            note: "Registry 4 note."
        };

        // Edits entire document. If you want to edit one single field,
        // comment fields.
        const newPersonEditable_edited = {
            name: "Dal Jones edited",
            addresses: ["Address 7 edited", "Address 8 edited"],
            contact_info: [
                {
                    type: "email edited",
                    detail: "dalejones@mail.com edited"
                }
            ],
            note: "Registry 4 note edited."
        }

        describe("Person document reading before having records", () => {
            it("Process", async () => {
                const response = await personController.read();
                if (response.status == "success" && response.description == "no documents stored")
                    assert(true);
                else {
                    console.log(response);
                    assert(false);
                }
            });
        })
        describe("Person document creation - Controller.add", () => {
            it("Document 1 creation", async () => {
                const response = await personController.add(newPerson1);
                if (response.name == newPerson1.name &&
                    response.addresses[0] == newPerson1.addresses[0] &&
                    response.addresses[1] == newPerson1.addresses[1] &&
                    response.note == newPerson1.note) {
                    assert(true);
                } else {
                    console.log(response);
                    assert(false);
                }
            });
            it("Document 2 creation", async () => {
                const response = await personController.add(newPerson2);
                if (response.name == newPerson2.name &&
                    response.addresses[0] == newPerson2.addresses[0] &&
                    response.addresses[1] == newPerson2.addresses[1] &&
                    response.note == newPerson2.note) {
                    assert(true);
                } else {
                    console.log(response);
                    assert(false);
                }
            });
            it("Document 3 creation", async () => {
                const response = await personController.add(newPerson3);
                if (response.name == newPerson3.name &&
                    response.addresses[0] == newPerson3.addresses[0] &&
                    response.addresses[1] == newPerson3.addresses[1] &&
                    response.note == newPerson3.note) {
                    assert(true);
                } else {
                    console.log(response);
                    assert(false);
                }
            });
        });
        describe("Person document reading - Controller.read & readByName", () => {
            it("Find registry 1 & 3 - readByName", async () => {
                const response = await personController.readByName(newPerson1);
                assert(response.length >= 2);
            });
            it("Find registry 2 - readByName", async () => {
                const response = await personController.readByName(newPerson2);
                assert(response.name == newPerson2.name ||
                    response[0].name == newPerson2.name);
            });
            it("Find registries - read", async () => {
                const response = await personController.read();
                assert(response.length >= 3);
            });
            it("Find registry 1 & 3 - readByName - lean", async () => {
                const response = await personController.readByName(newPerson1, true);
                assert(response.length >= 2);
            });
            it("Find registry 2 - readByName - lean", async () => {
                const response = await personController.readByName(newPerson2, true);
                assert(response.name == newPerson2.name ||
                    response[0].name == newPerson2.name);
            });
            it("Find registries - read - lean", async () => {
                const response = await personController.read(true);
                assert(response.length >= 3);
            });
            it("Find registry 1 - readById", async () => {
                const allRegistries = await personController.read();
                const id = allRegistries[0]._id;
                const response = await personController.readById(id);
                if (response.status == "failed" && response.description == "user not found") {
                    console.log(response)
                    assert(false);
                }
                else
                    assert(true);

            });
            it("Find registry 1 - readById - lean", async () => {
                const allRegistries = await personController.read();
                const id = allRegistries[0]._id;
                const response = await personController.readById(id, true);
                if (response.status == "failed" && response.description == "user not found") {
                    console.log(response)
                    assert(false);
                }
                else
                    assert(true);
            });
        });
        describe("Person document editing", () => {
            it("Document 4 add & edit", async () => {
                const addResponse = await personController.add(newPersonEditable);
                const response = await personController
                    .edit({ _id: addResponse._id }, newPersonEditable_edited);
                if (response.status == "success") {
                    assert(true);
                } else {
                    console.log(response);
                    assert(false);
                }
            });
        });
        describe("Person document deletion", () => {
            it("Person document 1 deletion", async () => {
                const response = await personController.delete({ name: newPerson1.name, addresses: newPerson1.addresses });
                if (response.status == "success" && response.description == "record deleted") {
                    assert(true);
                } else {
                    console.log(response);
                    assert(false);
                }
            });
            it("Person document 2 deletion", async () => {
                const response = await personController.delete({ name: newPerson2.name, addresses: newPerson2.addresses });
                if (response.status == "success" && response.description == "record deleted") {
                    assert(true);
                } else {
                    console.log(response);
                    assert(false);
                }
            });
            it("Person document 3 deletion", async () => {
                const response = await personController.delete({ name: newPerson3.name, addresses: newPerson3.addresses });
                if (response.status == "success" && response.description == "record deleted") {
                    assert(true);
                } else {
                    console.log(response);
                    assert(false);
                }
            });
            it("Person document 4 deletion - { _id: person_document_id } ", async () => {
                const documentFind = await personController.readByName({ name: newPersonEditable_edited.name });
                const response = await personController.delete({ id: documentFind._id });
                if (response.status == "success" && response.description == "record deleted") {
                    assert(true);
                } else {
                    console.log(response);
                    assert(false);
                }
            });
        });
    }

    if (testSettings.run_person_contactInfoSchemaTest) {
        const newPersonContactInfoTest = {
            name: "Contact Jones",
            addresses: ["Address 88", "Address 99"],
            contact_info: [
                {
                    type: "email",
                    detail: "contactjones@mail.com"
                },
                {
                    type: "phone",
                    detail: "394289347923"
                },
                {
                    type: "work phone",
                    detail: "8328472389473928"
                }
            ],
            note: "This person has contact info that will be edited."
        };

        const person_subdocument_contactInfo_settings = {
            run_addContactInfoSubdocument: true,
            run_editContactInfoSubdocument: true,
            run_deleteContactInfoSubdocument: true,
            run_deleteTestPersonDocument: true
        }

        describe("Person.contact_info [Object] subdocument tests", () => {
            it("Person contact_info document testing creation", async () => {
                const findResult = await personController.readByName({ name: newPersonContactInfoTest.name });
                if (findResult.status == "failed" && findResult.description == "document not found") {
                    const result = await personController.add(newPersonContactInfoTest);
                    if (result.status == "failed" && result.description == "name not given") {
                        console.log(result);
                        assert(false);
                    }
                }
            });
            if (person_subdocument_contactInfo_settings.run_addContactInfoSubdocument) {
                it("Add contact_info subdocument", async () => {
                    const contactInfo = {
                        type: "This is a contact info type test registry addition",
                        detail: "This is a contact info detail test registry addition"
                    };
                    const filter = {
                        name: newPersonContactInfoTest.name
                    }
                    const result = await personController.add_contactInfo(filter, contactInfo);
                    if (result.status = "success" && result.description == "contact info added") {
                        assert(true);
                    } else {
                        console.log(result);
                        assert(false);
                    }
                });
            }
            if (person_subdocument_contactInfo_settings.run_editContactInfoSubdocument) {
                it("Edit contact_info subdocument", async () => {
                    const findResult = await personController
                        .readByName({ name: newPersonContactInfoTest.name });
                    const filter = {
                        _id: findResult[0]._id,
                        _id_contact_info: findResult[0].contact_info[0]._id
                    };
                    const doc = {
                        type: "edited",
                        detail: "edited"
                    };
                    const result = await personController.edit_contactInfo(filter, doc);
                    if (result.status == "success" && result.description == "contact info modified") {
                        assert(true);
                    } else if (result.status == "failed" && result.description == "contact info modification failed") {
                        console.log(result);
                        assert(false);
                    }
                });
            }
            if (person_subdocument_contactInfo_settings.run_deleteContactInfoSubdocument) {
                it("Delete contact_info subdocument", async () => {
                    const resultFind = await personController.readByName({ name: newPersonContactInfoTest.name });
                    const payload = {
                        _id: resultFind[0]._id,
                        _id_contact_info: resultFind[0].contact_info[0]._id
                    }
                    const result = await personController.delete_contactInfo(payload);
                    if (result.status == "success" && result.description == "contact info record deleted") {
                        assert(true);
                    } else {
                        console.log(result);
                        assert(false);
                    }
                });
            }
            if (person_subdocument_contactInfo_settings.run_deleteTestPersonDocument) {
                it("Delete person contact_info test document", async () => {
                    const personFilter = {
                        name: newPersonContactInfoTest.name
                    }
                    const result = await personController.delete(personFilter);
                    if (result.status == "success" && result.description == "record deleted") {
                        assert(true);
                    } else {
                        console.log(result);
                        assert(false);
                    }
                });
            }
        });
    }
});