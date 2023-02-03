const express = require("express");
const restcontroller = require("../Controllers/restuarants");
const isAuth = require("../middlewares/auth");

const router = express.Router();

router.post("/create", isAuth, restcontroller.create);

router.get("/getall", isAuth, restcontroller.getall);

router.post("/get", isAuth, restcontroller.get);

router.post("/delete", isAuth, restcontroller.delete);

router.post("/update", isAuth, restcontroller.update);

module.exports = router;
