const db = require("../config");

exports.create = async (req, res, next) => {
    try {
        console.log(req.body);
        const id = req.body.id;
        const response = await db
            .collection("restuarants")
            .doc(id)
            .set(req.body);
        res.send("added success");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.delete = async (req, res, next) => {
    try {
        console.log("hi");
        const id = req.body.id;
        await db.collection("restuarants").doc(id).delete();
        res.send("Record deleted successfuly");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getall = async (req, res, next) => {
    try {
        const response = await db.collection("restuarants").get();
        let resarr = [];
        response.forEach((doc) => {
            resarr.push(doc.data());
        });
        res.send(resarr);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
};

exports.get = async (req, res, next) => {};

exports.update = async (req, res, next) => {
    try {
        const id = req.body.id;
        const data = req.body;
        const rest = await db.collection("restuarants").doc(id);
        await rest.update(data);
        res.send("record updated successfuly");
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
};
