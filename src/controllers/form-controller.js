const { form,
    formGroup,
    formIndividual } = require('../models/form')
const formValues = require('../utils/formOptions')

const formController = {
    getValuesForm: async (req, res) => {
        try {
            const values = formValues.FORM_OPTIONS;
            res.send(values)
        } catch (error) {
            res.status(412).send(error.message)
        }
    },
    createForm: async (req, res) => {
      try {
          const form = new FormModel(req.body);
          await form.save();
          res.send(form);
      } catch (error) {
          res.status(412).send(error.message);
      }  
    },
}

module.exports = formController;