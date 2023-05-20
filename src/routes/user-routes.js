const express = require('express');
const multiparty = require('connect-multiparty');
const api = express.Router();
const userController = require('../controllers/user-controller');
const middleware_authentication = require('../middlewares/authenticated')

const fs = require('fs')

const uploadDir = './uploads/avatar'

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
}

const md_upload = multiparty({ uploadDir : './uploads/avatar' })

api.get('/me', [middleware_authentication.ensureAuth], userController.getMe)
api.get('/', [middleware_authentication.ensureAuth], userController.getAllUsers)
api.get('/:id', [middleware_authentication.ensureAuth], userController.getUserById)
api.post('/', [middleware_authentication.ensureAuth, md_upload], userController.createUser);
api.patch('/:id', [middleware_authentication.ensureAuth, md_upload], userController.updateUser);
api.delete('/:id', [middleware_authentication.ensureAuth], userController.deleteUser);

module.exports = api;