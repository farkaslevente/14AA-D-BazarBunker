import express from "express";
import con from "../config/dbConfig.js";

const router = express.Router();

router.get("/", (_req, res) => {
    res.render("index.html");
});

router.get("/users", (_req, res) => {
    
    con.connect(function(err) {
    if (err) console.log(err);
        con.query("SELECT * FROM felhasznalok", function (err, result, fields) {
            if (err) console.log(err);
            console.log(result);
        });
    }); 
});

export default router;