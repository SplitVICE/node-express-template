const navbar = /* html */`
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">NodeJS Template by SPLIT VICE</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/about">About</a>
                </li>
            </ul>
        </div>
    </div>
    </nav>
`

const constants = {
    route_admin_login: '/api/admin/login',
    route_admin_logout: '/api/admin/logout',
    route_admin_isAuth: '/api/admin/isAuth'
};

// SETS

document.getElementById('navbar').innerHTML = navbar;