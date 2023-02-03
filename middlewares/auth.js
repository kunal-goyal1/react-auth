const e = require("express");
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    try {
        console.log("hi");
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.tokensecret);
        if (!decoded) {
            res.status(400).send("auth failed");
        } else {
            next();
        }
    } catch (error) {
        res.status(400).send("auth failed");
    }
};

module.exports = isAuth;
