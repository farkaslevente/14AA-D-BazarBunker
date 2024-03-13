const  express = require("express");
const {dbFunctions} = require('../database/dbFunc')
const { authController } = require('../controllers/auth.controller');
const { userController } = require('../controllers/user.controller')
const { verifyToken } = require("../middlewares/jwtMiddleware");
const router = express.Router();

router.get("/", async function(_req, res, next) {
    try {
        res.render("index.html");
    } catch (err) {
        console.error("Error while loading in the main page!", err.message);
        next(err);
    }
});

router.get("/pictures", [verifyToken], async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getPictures());
    } catch (err) {
        console.error("Error while getting pictures!", err.message);
        next(err);
    }
});

router.post("/pictures", [verifyToken], async function(req,res) {
    try {
        res.json(await userController.changePicture(req,res))
    } catch {
        console.error("Error while posting pictures!", err.message);
    }
});

router.get("/settlements", [verifyToken], async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getSettlements());
    } catch (err) {
        console.error("Error while getting settlements!", err.message);
        next(err);
    }
});

router.get("/counties", [verifyToken], async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getCounties());
    } catch (err) {
        console.error("Error while getting counties!", err.message);
        next(err);
    }
});

router.get("/users", [verifyToken], async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getUsers());
    } catch (err) {
        console.error("Error while getting users!", err.message);
        next(err);
    }
});

router.put("/users/patch", [verifyToken], async function(req, res) {
    try {
        res.json(await userController.patchUsers(req.body, res));
    } catch (err) {
        console.error("Error updating!", err.message);
    }
}),

router.delete("/users/delete", [verifyToken], async function(req, res) {
    try {
        res.json(await userController.deleteUsers(req.body, res))
    } catch (err) {
        console.error("Error deleting!", err.message);
    }
}),

router.get("/tokens", [verifyToken], async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getTokens());
    } catch (err) {
        console.error("Error while getting tokens!", err.message);
        next(err);
    }
});

router.delete("/tokens/delete", [verifyToken], async function (res) {
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

router.post("/register", async function (req,res) {
         res.json(await authController.register(req,res))
}),

router.post("/login", async function (req, res) {
        res.json(await authController.login(req, res))
}),

router.get("/ads", [verifyToken], async function(_req, res) {
    try {
        res.json(await dbFunctions.getAds());
    } catch (err) {
        console.error("Error while getting ads!", err.message);
    }
});

router.post("/ads", [verifyToken], async function(req,res) {
    res.json(await dbFunctions.postAds(req,res))
})


module.exports = {
    router
}