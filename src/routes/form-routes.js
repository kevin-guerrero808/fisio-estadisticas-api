const express = require('express');
const router = express.Router();

const formController = require('../controllers/form-controller');

router.get('/formInfo', formController.getValuesForm);




module.exports = router