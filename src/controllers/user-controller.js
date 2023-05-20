const axios = require('axios')
const User = require('../models/user'); // Importamos el modelo de usuario
const bcrypt = require('bcryptjs')
// const mailgun = require('../utils/mail-gun')

const userController = {
    getMe: async (req, res) => {
        try {
            const { user_id } = req.user;
            const response = await User.findById(user_id)
            if (!response) {
                return res.status(400).send({ msg: "Can't be founded user"})
            }
            res.status(200).send(response)
        } catch (error) {
            res.status(500).send({ msg: 'Error on the server'})
        }
    },

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
        try {
            const { firstName, lastName, email, password, role } = req.body; 
            const newUser = new User({ firstName, lastName, email, password, role, active: false }); 

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            newUser.password = hashedPassword;

            if (req.files.avatar) {
                const imagePath = image.getFilePath(req.files.avatar)
                newUser.avatar = imagePath
            }

            const userStored = await newUser.save();
            res.send({
                ...userStored.toObject(),
                password: null
            }); 

            // mailgun.mailgunSendCorreo({
            //     from: "Fisio",
            //     to: [newUser.email],
            //     subject: "Hello",
            //     text: "Testing some Mailgun awesomness!",
            // })
        } catch (error) {
            res.status(500).send(error.message); 
        }
    },

    updateUser: async (req, res) => {
        const userId = req.params.id; 
        const userData = req.body; 
        try {
            if ( userData.password) {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(userData.password, salt)
                userData.password = hashedPassword;
            } else {
                delete userData.password;
            }

            if (req.files && req.files.avatar) {
                const imagePath = image.getFilePath(req.files.avatar)
                userData.avatar = imagePath
            }

            await User.findByIdAndUpdate({ _id: userId }, userData);

            res.status(200).send({ msg: "success updated"})
        } catch (error) {
            res.status(500).send(error.message); 
        }
    },

    deleteUser: async (req, res) => {
        const userId = req.params.id; 
        User.findByIdAndDelete(userId)
        .then(user => {
            if(!user) {
                res.send('No found user');
            }
        })
        .catch(error => {
            res.send('Error to find user');
        });
    },
}


module.exports = userController;
