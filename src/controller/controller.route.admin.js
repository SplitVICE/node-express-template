const controller = {};
const env = require('../config/env');

controller.api_admin_login = (req, res) => {
    if (req.body.password == env.ADMIN_PASSWORD) {
        req.session.adminAuthenticated = true;
        res.json({ status: 'success', description: 'password correct' });
    } else {
        req.session.adminAuthenticated = false;
        res.json({ status: 'failed', description: 'password incorrect' });
    }
};

controller.api_admin_isAuth = (req, res) => {
    res.json({ status: req.session.adminAuthenticated });
};

controller.adi_admin_logout = (req, res) => {
    delete req.session.adminAuthenticated;
    res.json({ status: 'success', description: 'authentication terminated' });
};

module.exports = controller;