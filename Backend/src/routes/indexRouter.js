const  express = require("express");
const {dbFunctions} = require('../database/dbFunc')
const { authController } = require('../controllers/auth.controller')
const { userController } = require('../controllers/user.controller')
const { isAdmin } = require('../controllers/role.controller')
const { verifyToken } = require("../middlewares/jwtMiddleware");
const { emailController } = require('../controllers/email.controller')
const { uploadController } = require('../controllers/upload.controller')
const router = express.Router();


    //• ▌ ▄ ·. ▄• ▄▌▄▄▌  ▄▄▄▄▄▄▄▄ .▄▄▄  
    //·██ ▐███▪█▪██▌██•  •██  ▀▄.▀·▀▄ █·
    //▐█ ▌▐▌▐█·█▌▐█▌██▪   ▐█.▪▐▀▀▪▄▐▀▀▄ 
    //██ ██▌▐█▌▐█▄█▌▐█▌▐▌ ▐█▌·▐█▄▄▌▐█•█▌
    //▀▀  █▪▀▀▀ ▀▀▀ .▀▀▀  ▀▀▀  ▀▀▀ .▀  ▀

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
const upload = multer({storage: storage}).array('file', 6);

        //▄▄▄        ▄• ▄▌▄▄▄▄▄▄▄▄ ..▄▄ · 
        //▀▄ █·▪     █▪██▌•██  ▀▄.▀·▐█ ▀. 
        //▐▀▀▄  ▄█▀▄ █▌▐█▌ ▐█.▪▐▀▀▪▄▄▀▀▀█▄
        //▐█•█▌▐█▌.▐▌▐█▄█▌ ▐█▌·▐█▄▄▌▐█▄▪▐█
        //.▀  ▀ ▀█▄▀▪ ▀▀▀  ▀▀▀  ▀▀▀  ▀▀▀▀ 

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
        res.json(await userController.changePicture(req,res,req.user.id))
    } catch {
        console.error("Error while posting pictures!", err.message);
    }
});

router.get("/settlements", async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getSettlements());
    } catch (err) {
        console.error("Error while getting settlements!", err.message);
        next(err);
    }
});

router.get("/counties",  async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getCounties());
    } catch (err) {
        console.error("Error while getting counties!", err.message);
        next(err);
    }
});

router.get("/users", [verifyToken], [isAdmin], async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getUsers());
    } catch (err) {
        console.error("Error while getting users!", err.message);
        next(err);
    }
});

router.get("/users/:id", async function(req,res) {
    try {
        res.json(await dbFunctions.getUserById(req,res))
    } catch (err) {
        console.error("Error getting user by id!", err.message)
    }
})

router.put("/users/patch", [verifyToken], async function(req, res) {
    try {
        res.json(await userController.patchUsers(req.body, res));
    } catch (err) {
        console.error("Error updating!", err.message);
    }
}),

router.delete("/users/delete", [verifyToken], async function(req, res) {
    try {
        res.json(await userController.deleteUsers(req.body, res, req.user.id))
    } catch (err) {
        console.error("Error deleting!", err.message);
    }
}),

router.get("/tokens", [verifyToken], [isAdmin], async function(_req, res, next) {
    try {
        res.json(await dbFunctions.getTokens());
    } catch (err) {
        console.error("Error while getting tokens!", err.message);
        next(err);
    }
});

router.delete("/tokens/delete", [verifyToken], [isAdmin], async function (res) {
    try {
        res.json(await dbFunctions.deleteToken(res))
    } catch (err) {
        console.error("Error deleting tokens!", err.message);
    }
}),

router.post("/register", async function (req,res) {
    try {
        res.json(await authController.register(req,res))
    } catch (err) {
        console.error("Error registering!", err.message)
    }    
}),

router.post("/login", async function (req, res) {
    try { 
        res.json(await authController.login(req, res))
    } catch (err) {
        console.error("Error logging in!", err.message)
    }
}),

router.get("/ads", async function(_req, res) {
    try {
        res.json(await dbFunctions.getAds());
    } catch (err) {
        console.error("Error while getting ads!", err.message);
    }
});

router.post("/ads", [verifyToken], async function(req,res) {
    res.json(await dbFunctions.postAds(req,res,req.user.id))
});

router.post('/pictures/upload', [verifyToken], (req,res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(500).json({ error: err.message });
      } else if (err) {
        // An unknown error occurred when uploading
        return res.status(500).json({ error: "An unknown error occurred" });
      }

      // Everything went fine, files are uploaded successfully
      res.status(200).json({ message: "Files uploaded successfully" });
    });
    //res.json(req.file)
});

router.get("/pictures/upload", async (req,res) => {
    try {
        const filenames = await uploadController.uploadedPictures("./uploads")
        res.send(filenames)
    } catch (err) {
        console.error(err.message)
    }
});

router.post('/sendmail', [verifyToken], async function(req,res) {
    try {
        await emailController.sendMail(req,res)
    } catch (err) {
        console.error(err.message)
    }
});

router.post('/addfavourite', [verifyToken], async function(req,res) {
    try {
        res.json(await userController.updateFavourites(req,res,req.user.id))
    } catch (err) {
        console.error(err.message)
    }
});

router.get('/subscribe', [verifyToken], async function(req,res) {
    try {
        await emailController.subscribe(req,res,req.user.email)
    } catch (err) {
        console.error(err.message)
    }
});

router.post('/newpassword', [verifyToken], async function (req,res) {
    try {
        await userController.newPassword(req,res,req.user.id)
    } catch (err) {
        console.error(err.message)
    }
})


module.exports = {
    router
}