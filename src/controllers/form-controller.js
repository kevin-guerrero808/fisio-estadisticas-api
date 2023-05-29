const { Form,
    FormGroup,
    FormIndividual } = require('../models/form')
const formValues = require('../utils/formOptions')

const formController = {
    getValuesForm: async (req, res) => {
        try {
            const values = formValues.FORM_OPTIONS;
            res.status(200).send(values);
        } catch (error) {
            res.status(412).send(error.message)
        }
    },
    createForm: async (req, res) => {
      try {
          const form = new Form(req.body[0]);
          await form.save();
          if (form.group && form.individual) {
              res.status(400).send({ msg: "no se puede guardar 2 tipos de formulario, grupal e individual" });
          }
          if (form.group) {
              const formGroup = new FormGroup(req.body[1]);
              await formGroup.save();
              
          }
          if (form.individual) {
              const formIndividual = new FormIndividual(req.body[1]);
              await formIndividual.save();
          } 
        
          res.status(201).send(form);
      } catch (error) {
          res.status(400).send(error.message);
      }  
    },
}

module.exports = formController;