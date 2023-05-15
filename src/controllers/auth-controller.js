
const bycriptjs = require('bcryptjs');
const jwt = require('../utils/jwt');
const axios = require('axios')
const User = require('../models/user'); // Importamos el modelo de usuario

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) throw new Error("Email and ")
            const emailLowerCase = email.toLowerCase()
            const user = await User.findOne({ email: emailLowerCase }).exec()
            if (!user) {
                throw new Error('Not found user')
            }
            const check = await bycriptjs.compare(password, user.password)
            if (!check) {
                throw new Error('Incorreted password')
            }
            if (!user.active) {
                throw new Error('Unauthorized user or inactive')
            }
            res.status(200).send({
                access: jwt.createAccessToken(user),
                refresh: jwt.createRefreshToken(user)
            })
        } catch (error) {
            res.status(400).send({ msg: error.message })
        }

    },

     refreshAccessToken: (req, res) => {
        const { token } = req.body;
        if (!token) res.status(400).send({ msg: "Token required" })
        const { user_id } = jwt.decode(token)
        userModel.findOne({ _id: user_id }), (error, userStoraged) => {
            if (error) {
                res.status(500).send({ msg: "Error from server" })
            } else {
                res.status(200).send({
                    accessToken: jwt.createAccessToken(userStoraged)
                })
            }
        }
    }
}
module.exports = authController;