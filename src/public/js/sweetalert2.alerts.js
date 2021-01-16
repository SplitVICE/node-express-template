/**
 * Shows a small alert at the up right corner
 * with success animation and progress bar.
 * @param { String } message Message to show.
 * @param { Int } timer Time to be shown expressed in milliseconds.
 */
function cornerSmallAlertSuccess(message, timer) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
    })

    Toast.fire({
        icon: 'success',
        title: message
    })
}

function errorAlert(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text
    })
}