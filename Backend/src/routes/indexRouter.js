import express from "express";
import getAllUsers from "../database/dbFunc.js"

const router = express.Router();

router.get("/", async function(req, res, next) {
    try {
        res.render("index.html");
    } catch (err) {
        console.error("Error while loading in the main page!", err.message);
        next(err);
    }
});

router.get("/users", async function(req, res, next) {
    try {
        res.json(await getAllUsers(req.query.page));
    } catch (err) {
        console.error("Error while getting users!", err.message);
        next(err);
    }
});

export default router;