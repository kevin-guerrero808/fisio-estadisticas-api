const express = require('express');
const api = express.Router();
const userController = require('../controllers/user-controller');
const middleware_authentication = require("../middlewares/authenticated");

// Rutas que utilizan el controlador de usuarios
api.get('/users', [middleware_authentication.ensureAuth], userController.getAllUsers);
api.get('/users/:id', [middleware_authentication.ensureAuth], userController.getUserById);
api.post('/users/new', [middleware_authentication.ensureAuth], userController.createUser);
api.put('/users/:id', [middleware_authentication.ensureAuth], userController.updateUser);
api.delete('/users/:id', [middleware_authentication.ensureAuth], userController.deleteUser);

module.exports = api;