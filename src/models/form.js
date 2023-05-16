const mongoose = require('mongoose')

const options = { discriminatorKey: 'kind' }
const formSchema = mongoose.Schema({
    practiceName: { type: mongoose.Schema.Types.ObjectId, ref: 'Practice', require: true },
    teacherName: String,
    practitionerName: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},//otro schema
    activityType: {type: Number, require: true},
    group: {

    },
    individual: {
        
    }

}, options)

const formGroupalSchema = mongoose.Schema({
    count: Number,
    centralTopic: String,
    activityPerfomed: { id: Number, name: String }, //otro scherma
}, options)

const formIndividualSchema = mongoose.Schema({
    patientName: String,
    antiquity: String,
    sex: String,
    age: { require: true, type: Number },
    hasHealthCondition: Boolean,
    condition: { code: Number, name: String, description: String }
}, options)

const form = mongoose.model("Form", formSchema);
const formGroup = form.discriminator('FormGroup', formGroupalSchema)
const formIndividual = form.discriminator('FormGroup', formGroupalSchema)
module.exports = {
    formGroup,
    formIndividual
}
