const adminAuthController = {};
const env = require("../config/env");

/**
 * Logs in user as admin.
 * @param { Object } adminCredentials Admin password phrase.
 * @param adminCredentials.password Admin password phrase string.
 */
adminAuthController.adminLogin = adminCredentials => {
    if (!adminCredentials.password)
        return { status: "failed", description: "password parameter missing" };

    if (env.ADMIN_PASSWORD == adminCredentials.password)
        return { status: "success", description: "password correct" };

    return { status: "failed", description: "password incorrect" };
}

module.exports = adminAuthController;