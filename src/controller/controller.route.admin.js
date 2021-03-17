const controller_route_admin = {};
const { adminLogin } = require('../controller/controller.model.admin');

controller_route_admin.admin_api_login = (req, res) =>{
    const result = adminLogin(req.body);
    if (result.status == "success" && result.description == "password correct") {
        req.session.adminAuthenticated = true;
        res.json(result);
    } else {
        req.session.adminAuthenticated = false;
        res.json(result);
    }
};

controller_route_admin.admin_api_logout = (req, res) =>{
    delete req.session.adminAuthenticated;
    res.redirect("/");
};

module.exports = controller_route_admin;