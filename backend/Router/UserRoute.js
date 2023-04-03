const UserController = require('../Controller/UserController');
var express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
let jwt = require('jsonwebtoken')

///========================================User routes==============================================================

router.post("/register", UserController.Adduser);
router.get("/register", UserController.GetUser)
router.get("/register/:id", UserController.getoneuser);
router.post("/login", UserController.Login);
router.post("/forgot_password", UserController.Mail)
router.put("/ResetPassword/:id/:token", UserController.ResetPass)
router.put("/ChangePassword/:id", UserController.ChangePass)

// router.put("/change_password/:id", auth, UserController.ChangePass);

router.post("/verify_token", auth,
    (req, res) => {
        res.send("token threw authentication successfull")
    }
);




module.exports = router;
