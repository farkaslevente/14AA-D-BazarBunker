const  express = require("express");
const {dbFunctions} = require('../database/dbFunc')

const router = express.Router();

router.get("/", async function(_req, res, next) {
    try {
        res.render("index.html");
    } catch (err) {
        console.error("Error while loading in the main page!", err.message);
        next(err);
    }
});

router.get("/users", async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getAllUsers());
    } catch (err) {
        console.error("Error while getting users!", err.message);
        next(err);
    }
});

module.exports = {
    router
}