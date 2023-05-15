const axios = require('axios')
const User = require('../models/user'); // Importamos el modelo de usuario
const mailgun = require('../utils/mail-gun')

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.send(users);
        } catch (error) {
            res.status(500).send(error.message);  
        }
    },


    getUserById: async (req, res) => {
        const userId = req.params.id; 
        try {
            const user = await User.findById(userId); 
            if (!user) { 
                return res.status(404).send('Usuario no encontrado');
            }
            res.send(user); // Enviamos los detalles del usuario en formato JSON
        } catch (error) {
            res.status(500).send(error.message); 
        }
    },

    createUser: async (req, res) => {
        const { firstName, lastName, email, password, role, active, avatar } = req.body; 
        const newUser = new User({ firstName, lastName, email, password, role, active, avatar }); 
        try {
            await newUser.save(); 
            res.send(newUser); 

            mailgun.mailgunSendCorreo({
                from: "Fisio",
                to: [newUser.email],
                subject: "Hello",
                text: "Testing some Mailgun awesomness!",
            })
        } catch (error) {
            res.status(500).send(error.message); 
        }
    },

    updateUser: async (req, res) => {
        const userId = req.params.id; 
        const updates = req.body; 
        try {
            const user = await User.findByIdAndUpdate(userId, updates, { new: true }); 
            if (!user) { 
                return res.status(404).send('Usuario no encontrado');
            }
            res.send(user); 
        } catch (error) {
            res.status(500).send(error.message); 
        }
    },

    deleteUser: async (req, res) => {
        const userId = req.params.id; 
        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                if (!user) {
                    return res.status(404).send('Usuario no encontrado');
                }
                res.send('Usuario eliminado correctamente');
            }
        } catch (error) {
                res.status(500).send(error.message); 
            }
    },
    
   
    }


    module.exports = userController;
