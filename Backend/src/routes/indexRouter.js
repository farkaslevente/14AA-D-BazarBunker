const  express = require("express");
const {dbFunctions} = require('../database/dbFunc')
const { authController } = require('../controllers/auth.controller')
const router = express.Router();

router.get("/", async function(_req, res, next) {
    try {
        res.render("index.html");
    } catch (err) {
        console.error("Error while loading in the main page!", err.message);
        next(err);
    }
});

router.get("/pictures", async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getPictures());
    } catch (err) {
        console.error("Error while getting pictures!", err.message);
        next(err);
    }
});

router.get("/users", async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getUsers());
    } catch (err) {
        console.error("Error while getting users!", err.message);
        next(err);
    }
});

router.post("/users/post", async function(req, res) {
    try {
        res.json(await dbFunctions.postUsers(req.body));
    } catch (err) {
        console.error("Error posting!", err.message);
    }
});

router.put("/users/put", async function(req, res) {
    try {
        res.json(await dbFunctions.putUsers(req.body, res));
    } catch (err) {
        console.error("Error updating!", err.message);
    }
}),

router.delete("/users/delete", async function(req, res) {
    try {
        res.json(await dbFunctions.deleteUsers(req.body, res))
    } catch (err) {
        console.error("Error deleting!", err.message);
    }
}),

router.get("/tokens", async function (req, res) {
    try {
        res.json(await dbFunctions.getTokens(req, res))
    } catch (err) {
        console.error("Error getting tokens!", err.message);
    }
})

router.delete("/tokens/delete", async function (res) {
    try {
        res.json(await dbFunctions.deleteToken(res))
    } catch (err) {
        console.error("Error deleting tokens!", err.message);
    }
}),

router.post("/exec", async function(req, res) {
    try {
        res.json(await dbFunctions.execQuery(req.body))
    } catch (err) {
        console.error("Error executing query!", err.message);
    }
}),

router.post(
    "/register", async function (req,res) {
         res.json(await authController.register(req,res))
}),

router.post("/login", async function (req, res) {
        res.json(await authController.login(req, res))
}),

router.post("/", function (req, res) {
    res.json(dbFunctions.acceptToken(req, res))
})


module.exports = {
    router
}