const mongoose = require('mongoose')

const formSchema = mongoose.Schema({
    practiceName: String,
    teacherName: String,
    practitionerName: {type: String, id: Number, require: true},//otro schema
    activityType: {type: Number, require: true},
    group: {
        count: Number,
        centralTopic: String,
        activityPerfomed: { id: Number, name: String },//otro scherma

    },
    individual: {
        patientName: String,
        antiquity: String,
        sex: String,
        age: { require: true, type: Number },
        hasHealthCondition: Boolean,
        condition:{code: Number, name: String, description: String }
        
    }

})