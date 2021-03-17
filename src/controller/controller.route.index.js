const env = require("../config/env");
const path = require("path");
const controller_route_index = {};

controller_route_index.root = (req, res) =>{
    const hbsParams = {
        adminPassword: env.ADMIN_PASSWORD,
        adminAuthenticated: req.session.adminAuthenticated
    };
    res.render("index", { hbsParams: hbsParams });
};

controller_route_index.about = (req, res) =>{
    res.sendFile(path.join(__dirname, "../public/html/about.html"));
};

module.exports = controller_route_index;