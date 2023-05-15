const express = require('express');
const api = express.Router();
const userController = require('../controllers/user-controller');

// Rutas de ejemplo que utilizan el controlador de usuarios
api.get('/users', userController.getAllUsers);
api.get('/users/:id', userController.getUserById);
api.post('/users', userController.createUser);
api.put('/users/:id', userController.updateUser);
api.delete('/users/:id', userController.deleteUser);

module.exports = api;