const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
const { API_VERSION } = require('./constants')

const app = express();
/* work with the extension client rest */
app.use(bodyParser.json())
/** void cors problems */
app.use(cors())
/** request with postman */
app.use(bodyParser.urlencoded({ extended: true }))

const authRoutes = require('./src/routes/auth-routes');
const userRoutes = require('./src/routes/user-routes');
const menuRoutes = require('./src/routes/menu-routes');
const formRoutes = require('./src/routes/form-routes');
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`api/${API_VERSION}/users`, userRoutes);
app.use(`api/${API_VERSION}/menu`, menuRoutes);
app.use(`api/${API_VERSION}/form`, formRoutes);


module.exports = app
