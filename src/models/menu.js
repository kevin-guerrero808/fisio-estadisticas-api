const mongoose = require('mongoose');
const MenuSchema = mongoose.Schema({
    path: String,
    label: String,
    order: Number,
    active: Boolean,
    icon: String,
    code: String,
    container: String
});

module.exports = mongoose.model("Menuschema", MenuSchema);