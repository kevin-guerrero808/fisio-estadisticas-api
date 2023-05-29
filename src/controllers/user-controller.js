const axios = require('axios')
const User = require('../models/user'); // Importamos el modelo de usuario
const bcrypt = require('bcryptjs')
// const mailgun = require('../utils/mail-gun')

const isValidLocation = async (department, municipality) => {
    const municipalities = await getMunicipalities();

    return municipalities.data.some(municipality => municipality.departamento === department && municipality === municipality);
}

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
        const userData = req.body; 

        

        try {
            if (!(await isValidLocation(userData.department, userData.municipality))) {
                throw new Error('Invalid department and municipality');
            }

            const newUser = new User({ ...userData, active: false }); 

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
