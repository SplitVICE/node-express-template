document.getElementById("btn_createTemplatePersonDocuments")
    .addEventListener('click', () => {
        createTemplatePersonDocuments();
    });

async function createTemplatePersonDocuments() {
    const request = await fetch("/api/person/createtemplates", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const response = await request.json();
    if(response.status = "success"){
        cornerSmallAlertSuccess("Template person documents created", 1500);
    }
}

async function login() {
    const request = await fetch("/admin/api/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { password: adminPassword.value }
        )
    });
    const response = await request.json();

    if (response.status == "failed" &&
        response.description == "password incorrect") {
        passwordIncorrect(response);
        return;
    }

    if (response.status == "failed" &&
        response.description == "password parameter missing") {
        missingPasswordParameter(response);
        return;
    }

    if (response.status == "success" &&
        response.description == "password correct") {
        location.reload();
    }
}

async function logout() {
    let request = await fetch("/admin/api/logout", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    await request;
    location.reload();
}

function passwordIncorrect() {
    document.getElementById("passwordIncorrect").innerHTML =
        `
    <div class="alert alert-danger" role="alert">
        Password is incorrect.
    </div>
    `;
}

function missingPasswordParameter() {
    document.getElementById("passwordIncorrect").innerHTML =
        `
    <div class="alert alert-warning" role="alert">
        Missing password parameter.
    </div>
    `;
}

document.getElementById("adminPassword").addEventListener("keyup", e => {
    if (e.key === "Enter") {
        login();
    }
});