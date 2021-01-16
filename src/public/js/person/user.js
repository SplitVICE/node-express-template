const searchInput = document.getElementById("searchInput");
const btn_search = document.getElementById("btn_search");


btn_search.addEventListener("click", () => {
    searchByName();
});

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        searchByName();
    }
});

function searchByName() {
    if (searchInput) {
        const url = "/person?search=" + searchInput.value;
        window.location.href = url;
    }
}

/**
 * Renders a status message from server.
 * @param {Object} response Object with status details
 * @params response.status status of the response.
 * @params response.description description of the response.
 */
function renderResponseStatus(response) {
    if (response.status == "failed" &&
        response.description == "missing name") {
        document.getElementById("error").innerHTML =
            `
        <div class="alert alert-warning" role="alert">
            Name to search not provided
        </div>
        `;
    }

    if (response.status == "failed" &&
        response.description == "document not found") {
        document.getElementById("error").innerHTML =
            `
        <div class="alert alert-warning" role="alert">
            Person registry not found
        </div>
        `;
    }

    if (response.status == "success" &&
        response.description == "no records stored") {
        document.getElementById("error").innerHTML =
            `
        <div class="h5">
            No person registries stored
        </div>
        `;
    }
}

const getParams = function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

const params = getParams(window.location.href);
if (params.search)
    searchInput.value = params.search;
