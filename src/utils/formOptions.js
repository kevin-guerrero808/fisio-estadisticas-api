const FORM_OPTIONS = {
    PRACTICE_NAME : ['Actividad fisica y deporte ',
        'Salud Física',
        'Salud laboral',
        'Adulto – adulto mayor 1',
        'Adulto – adulto mayor 2',
        'Adulto – adulto mayor 3',
        'Infancia – junventud 1',
        'Infancia – junventud 2',
        'Infancia – junventud 3'
    ],
    ACTIVITY_TYPE: [{ id: 1, description: 'grupal' },
        { id: 2, description: 'individual' }],
    GRUPAL: {
        activityPerfomed: [{ id: 1, description: 'calentamiento' }]
    },
    INDIVIDUAL: {
        ANTIQUITY: ['antiguo', 'nuevo'],
        SEX: ['M', 'F'],
        HAS_CONDITION: ['Con condición', 'Sin condición'],
    }
   

}
module.exports = {FORM_OPTIONS}