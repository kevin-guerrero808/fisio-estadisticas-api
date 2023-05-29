const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind' }
const FormSchema = mongoose.Schema({
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
    header: { type: mongoose.Schema.Types.ObjectId, ref: 'FormSchema', require: true },
    count: Number,
    centralTopic: String,
    activityPerfomed: { id: Number, name: String }, //otro scherma
}, options)

const formIndividualSchema = mongoose.Schema({
    header: { type: mongoose.Schema.Types.ObjectId, ref: 'FormSchema', require: true },
    patientName: String,
    antiquity: String,
    sex: String,
    age: { require: true, type: Number },
    hasHealthCondition: Boolean,
    condition: { code: Number, name: String, description: String }
}, options)

const form = mongoose.model('Form', FormSchema);
const formGroup = form.discriminator('FormGroup', formGroupalSchema)
const formIndividual = form.discriminator('formIndividualSchema', formIndividualSchema)
module.exports = {
    form,
    formGroup,
    formIndividual
}
