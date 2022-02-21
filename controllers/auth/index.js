var { registerController } =require("./register");
var { loginController } = require("./login");
var { logoutController } = require("./logout");
module.exports ={
    registerController,
    loginController,
    logoutController
}