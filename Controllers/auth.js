const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../config");

exports.login = async (req, res, next) => {
    try {
        const token = jwt.sign(
            { data: { email: req.body.email } },
            process.env.tokensecret,
            { expiresIn: "24h" }
        );
        const response = await db.collection("users").doc(req.body.email).get();
        if (response.exists) {
            const dt = response.data();
            if (dt.password === req.body.password) {
                res.send(token);
            } else {
                res.status(401).send("credentials wrong");
            }
        } else {
            res.status(401).send("credentials wrong");
        }
    } catch (error) {
        res.status(401).send("credentials wrong");
    }
};
