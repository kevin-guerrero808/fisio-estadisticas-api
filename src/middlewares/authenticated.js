const jwt = require("../utils/jwt");

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
        const payload = jwt.decoded(token);
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

module.exports = {
    ensureAuth,
};