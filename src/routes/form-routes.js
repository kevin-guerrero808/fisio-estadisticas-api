const express = require('express');
const api = express.Router();
const middleware_authentication = require("../middlewares/authenticated");

const formController = require('../controllers/form-controller');

api.get('/formInfo', [middleware_authentication.ensureAuth], formController.getValuesForm);
api.post('/saveForm', [middleware_authentication.ensureAuth], formController.createForm);




module.exports = api;