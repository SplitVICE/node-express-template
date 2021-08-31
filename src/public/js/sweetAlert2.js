function up_right_message(message, icon = 'success') {
    const Toast = Swal.mixin({
        icon: icon,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: message
    })
}

function error(title, message, footer) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        footer: footer
    })
}