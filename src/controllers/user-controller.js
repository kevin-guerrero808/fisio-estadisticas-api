const axios = require('axios')
const User = require('../models/user'); // Importamos el modelo de usuario
//const mailgun = require('../utils/mail-gun')

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
        const userData = req.body; 
        const newUser = new User({ ...userData, active: false }); 

        

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            newUser.password = hashedPassword;

            await newUser.save(); 
            res.send(newUser);
            if (req.files.avatar) {
                const imagePath = image.getFilePath(req.files.avatar);
                newUser.avatar = imagePath;
            }

            // mailgun.mailgunSendCorreo({
            //     from: "Fisio",
            //     to: [newUser.email],
            //     subject: "Hello",
            //     text: "Testing some Mailgun awesomness!",
            // });
            const userStored = await user.save();
            res.status(201).send(userStored);
        } catch (error) {
            res.status(400).send({ msg: "error al crear el usuario: ", er: error.message }); 
        }
    },
   

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const userData = req.body;

            if (userData.password) {
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(userData.password, salt);
                userData.password = hashPassword;
            } else {
                delete userData.password;
            }

            if (req.files && req.files.avatar) {
                const imagePath = image.getFilePath(req.files.avatar);
                userData.avatar = imagePath;
            }

            await User.findByIdAndUpdate({ _id: id }, userData);

            res.status(200).send({ msg: "Actualización correcta" });
        } catch (error) {
            res.status(400).send({ msg: "Error al actualizar el usuario" });
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
