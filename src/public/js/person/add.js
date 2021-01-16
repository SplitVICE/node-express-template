// ========================================================================
// === ID DOM elements capture.

const name = document.getElementById('name');
const notes = document.getElementById('notes');
const card_example = document.getElementById("card_example");

// Addresses.
const address = document.getElementById('address');
const address_list = document.getElementById('address_list');

// Contact info.
const contact_info_type = document.getElementById('contact_info_type');
const contact_info_detail = document.getElementById('contact_info_detail');
const contact_info_list = document.getElementById('contact_info_list');

const address_array = [];
const contact_info_array = [];

// ========================================================================
// === Event listener initializations ===
// ========================================================================

name.addEventListener('keyup', () => {
    renderExampleCard();
});

document.getElementById("btn_add").addEventListener('click', async () => {
    if (!necessaryInputsGiven()) {
        return;
    }
    const request = await fetch('api/person', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                var1: data1,
                var2: data2
            }
        )
    });
    const response = await request.json();
    if (response.status == 'success')
        console.log('Success');
});

document.getElementById("btn_add_address").addEventListener('click', () => {
    addAddress();
});

document.getElementById("address").addEventListener("keyup", e => {
    if (e.key === "Enter") {
        addAddress();
    }
});

document.getElementById("btn_add_contactInfo").addEventListener("click", () => {
    addContactInfo();
});

/**
 * ============================================================================
 * --- Functions
 * ============================================================================
 */

// =============================================================================
// === Contact info functions.

function addContactInfo() {
    if (!contact_info_type.value && !contact_info_detail.value)
        return;
    const contactInfo = {
        type: contact_info_type.value,
        detail: contact_info_detail.value,
    };
    contact_info_array.push(contactInfo);
    contact_info_type.value = "";
    contact_info_detail.value = "";
    renderContactInfoList();
}

function renderContactInfoList() {
    contact_info_list.innerHTML = "<ul>";
    for (let i = 0; i < contact_info_array.length; i++) {
        const element = contact_info_array[i];
        contact_info_list.innerHTML += addContactInfoElementToList(element);
    }
    contact_info_list.innerHTML += "</ul>";
}

function addContactInfoElementToList(element) {
    return `
    <li>
        ${element.type}: ${element.detail} | <a href="javascript:void(0)" onclick="removeContactInfo('${element.type}','${element.detail}')">Remove</a>
    </li>
    `;
}

function removeContactInfo(type, detail) {
    for (let i = 0; i < contact_info_array.length; i++) {
        const element = contact_info_array[i];
        if (element.type == type && element.detail == detail) {
            contact_info_array.splice(i, 1);
            break;
        }
    }
    renderContactInfoList();
}

// =============================================================================
// === Document addition functions.

function necessaryInputsGiven() {
    if (name.value)
        return true;
    const message = {
        title: "Missing required information",
        text: "You must provide at least the name of the new registry."
    }
    errorAlert(message.title, message.text);
    return false;
}

// =============================================================================
// === Address functions

function addAddress() {
    if (!address.value)
        return;
    address_array.push(address.value);
    address.value = "";
    renderAddressList();
}

function renderAddressList() {
    address_list.innerHTML = "<ul>";
    for (let i = 0; i < address_array.length; i++) {
        const element = address_array[i];
        address_list.innerHTML += addAddressToAddressList(element);
    }
    address_list.innerHTML += "</ul>";
}

function addAddressToAddressList(element) {
    return `
        <li>
        ${element} | 
            <a href="javascript:void(0)" onclick="removeAddress('${element}')">
                Remove
            </a>
        </li>`;
}

function removeAddress(element) {
    address_array.splice(address_array.indexOf(element), 1);
    renderAddressList();
}

// =============================================================================
// === Card example functions.

// ===============
// === VUE
var app = new Vue({
    el: "#app",
    data: {
        foo: "FOO"
    }
});


/**
 * Renders the Card View.
 * @param { Boolean } name If true, will only make changes on name.
 * @param { Boolean } addresses If true, will only make changes on addresses.
 * @param { Boolean } contactinfo If true, will only make changes on contact info.
 * @param { Boolean } notes If true, will only make changes on notes.
 */
function renderExampleCard(name, addresses, contactinfo, notes) {
    card_example.innerHTML = `
    <div class="col-12 col-sm-12 col-md-12 col-lg-4">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${renderExampleCard_name(name)}</h5>
                    <p class="card-text">
                        ${renderExampleCard_addresses(addresses)}
                        <hr>
                        ${renderExampleCard_contactInfo(contactinfo)}
                        ${renderExampleCard_notes(notes)}
                    </p>
                </div>
            </div>
        </div>
    `;
}

function renderExampleCard_name() {
    if (name.value)
        return name.value
    else
        return "No name";
}

function renderExampleCard_addresses() {
    let return_value = "";
    if (address_array.length == 0)
        return `<ul><li>No Addresses registered</li></ul>`;


    return_value = `<div class="h6">Addresses</div><ul>`;
    for (let i = 0; i < address_array.length; i++) {
        const element = address_array[i];
        return_value += `<li>${element}</li>`;
    }
    return_value += `</ul>`;
}

function renderExampleCard_contactInfo() {
    let return_value = "";
    if (contact_info_array.length == 0)
        return `<ul><li>No Addresses registered</li></ul>`;

    return_value = `<div class="h6">Addresses</div><ul>`;
    for (let i = 0; i < contact_info_array.length; i++) {
        const element = contact_info_array[i];
        return_value += `<li>${element}</li>`;
    }
    return_value += `</ul>`;

}

function renderExampleCard_notes() {
    if (notes.value != "")
        return `<hr><div class="h6">${notes.value}</div>`;
    else
        return ``;

}

renderExampleCard();