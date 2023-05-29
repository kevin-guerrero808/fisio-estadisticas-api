const express = require("express")
const AuthController = require("../controllers/auth-controller");
const middleware_authentication = require("../middlewares/authenticated");
const api = express.Router();

api.post("/login", AuthController.login);
api.post("/refresh_access_token", AuthController.refreshAccessToken)

module.exports = api;