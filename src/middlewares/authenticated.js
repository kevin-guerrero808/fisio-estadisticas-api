const jwt = require("../utils/jwt");
const userModel = require("../models/user")

const ensureAuth = (req, res, next) => {
    const { authorization } = req.headers;
    console.log("autorización :", authorization);
    if (!authorization || !authorization.startsWith("Bearer ")) { 
        return res
            .status(403)
            .send({ msg: "La petición no tiene la cabecera de autenticación" });
    }
    const token = authorization.split(" ")[1];
    console.log("split", authorization.split(" "))
    try {
        const payload = jwt.decode(token);
        console.log("payload: ", payload);
        const { expiration_date } = payload;
        const currentTime = Date.now();

        if (expiration_date <= currentTime) {
            return res.status(400).send({ msg: "El token ha expirado" });
        }

        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send({ msg: "Token inválido" });
    }
};

const adminRole = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    try {
        const payload = jwt.decode(token);
        req.user = payload;
        const user = await userModel.findById(payload.user_id);
        console.log("usuario: ", user);
        if (user.role != 'admin') return res.status(401).send({ msg: "no autorizado" });
        next();
    } catch (error) {
        return res.status(401).send({ msg: "no autorizado" });
    }
}

module.exports = {
    ensureAuth,
    adminRole
};