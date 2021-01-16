function deleteRegistry(_id) {
    deletePerson(_id);
}

function editPerson(_id) {
    window.location.href = `/person/edit/?id=${_id}`;
}

function deletePerson(_id) {
    Swal.fire({
        title: 'Delete person registry',
        text: "This action cannot be undone. Are you sure?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            deletePerson_request(_id);
        }
    })
}

async function deletePerson_request(_id) {
    const request = await fetch("/api/person/", {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                _id: _id
            }
        )
    });
    const response = await request.json();
    console.log(response)
    if (response.status == "success" && response.description == "record deleted") {
        location.reload();
    } else {
        
    }
}