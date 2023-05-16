const express = require('express');
const api = express.Router();

const formController = require('../controllers/form-controller');

api.get('/formInfo', formController.getValuesForm);
api.post('/saveForm', formController.createForm);




module.exports = api;