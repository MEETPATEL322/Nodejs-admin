// const transporter = require ('../config/emailConfig');
const UserModel = require('../Model/UserModel');
var bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// const router = require('../Router/UserRoute');
var config = require("dotenv").config();
var nodeMailer = require('nodemailer');
var express = require('express')
var cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

//=========================Add User API============================================================================

module.exports.Adduser = (req, res) => {
    var password = req.body.password;
    var changepassword = req.body.changepassword;
    if (changepassword === password) {
        console.log("Password MAtch")
        // }
        bcrypt.hash(req.body.password, 10, (err, psw) => {
            // console.log(err)
            var hash = psw;

            var User = new UserModel({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                ConfirmPass: hash
            })
            // console.log(User)
            User.save(function (err, data) {
                if (err) {

                    res.json({ Msg: "Something went Wrong in user Data Added", status: 404, data: err })

                }
                else {

                    if (data) {
                        const token = jwt.sign(
                            {

                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                email: req.body.email,
                                // password: hash,
                                // ConfirmPass: hash,
                                id: User._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "24h"

                            }
                        );

                        // User.logintoken = token
                        res.json({ Msg: "User Data Added SuccessFully", status: 200, data: data })

                    }
                }
            })

        })
    }
}

//=================================Get User Details================================================================

module.exports.GetUser = (req, res) => {
    UserModel.find({}, (err, data) => {
        if (err) {

            res.json({ Msg: "Something went Wrong in user data Finding", status: 404, data: err })

        }
        else {

            res.json({ Msg: "User Data Finded....", status: 200, data: data })

        }

    })


}

//=========================================Get Single User Detais==================================================

module.exports.getoneuser = (req, res) => {

    UserModel.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {

            res.json({ msg: "Error in Finding Single User Data......", status: 404, data: err })
        }
        else {
            res.json({ msg: "Single USer Data Find....", status: 200, data: data })
        }
    })

}

//=============================================Login API===========================================================

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email && password) {
            const user = await UserModel.findOne({ email: email })
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password)
                if ((user.email === email) && isMatch) {
                    // Generate JWT Token
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    res.send({ "status": "success", "message": "Login Success!", token: token, id: user._id })
                } else {
                    res.send({ "status": "failed", "message": "Password is Incorrect!" })
                }
            } else {
                res.send({ "status": "failed", "message": "You are not a Registered User!" })
            }
        } else {
            res.send({ "status": "failed", "message": "All Fields are Required!" })
        }
    } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "Unable to Login!" })
    }
}

//===============================Forget Password only mail goes from this API====================================== 

module.exports.Mail = async (req, res) => {

    // let Email = req.body.Email
    const { email } = req.body

    var users = await UserModel.findOne({ email: req.body.email })
    // console.log("email======>>>>>>>>>>>",users);
    if (email) {
        const user = await UserModel.findOne({ email: email })
        console.log("user email", email);
        if (user) {
            const secret = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '1m' })
            const link = `http://localhost:3011/auth/ResetPassword/${users._id}/${token}`
            console.log(link)

            let transporter = await nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'saumil.golarana@sapphiresolutions.net',
                    pass: 'iusdokizqmthinry'
                }
            });
            let mailOptions = {
                from: '"Saumil Golarana" <saumil.golarana@sapphiresolutions.net>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Forget Password Send on  Email', // Subject line
                // text: 'this is generated Password with node mailer', // plain text body
                html: "Forget Password then click Here==>" + "        " + `<a href=${link}>Click here for reset Password</a>` // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                // console.log('Message %s sent: %s', info.messageId, info.response);
                res.json({ msg: 'Email Sent', token: token });
            });
        }
        else {
            res.json({ msg: 'Email Sent', status: 'invalid email..' });
        }
    }
}

//=============================After mail Reset Password API======================================================= 

module.exports.ResetPass = async (req, res) => {

    let token = req.params.token
    console.log(token)
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        var newpassword = req.body.newpassword;
        var confirmpassword = req.body.confirmpassword;
        // var   token  = req.params.token
        if (!newpassword || !confirmpassword) {
            res.json({ msg: "Please ENter the New Password and Confirm Password" })
        }
        else {
            if (newpassword === confirmpassword) {
                bcrypt.hash(newpassword, 10, (err, psw) => {
                    var hash = psw
                    UserModel.findByIdAndUpdate({ _id: req.params.id }, { password: hash, ConfirmPass: hash }, (err, data) => {
                        if (err) {
                            res.json({ message: "Something went Wrong in Update User data...", status: 404, data: err })
                        }
                        else {
                            if (data) {
                                const token = jwt.sign(
                                    {
                                        Password: hash
                                    },
                                    process.env.JWT_SECRET_KEY,
                                    {
                                        expiresIn: "24h"
                                    }
                                );
                                res.json({ message: "User Data Updated....", status: 200, data: data })
                            }
                        }
                    })
                }
                )
            }
            else {
                res.json({ message: "Newpassword not match with Confirmpassword", status: 'failed' })
            }
        }
    } catch (error) {
        // console.log(error)
        res.send({ message: "Your session has been Expired!", status: 'failed' })
    }


}

//=======================================Change Password API======================================================= 

module.exports.ChangePass = async (req, res) => {
    console.log("change password..");
    let user = await UserModel.findById({ _id: req.params.id })
    if (!user) {
        console.log("user not found");
        res.json({ msg: "this request User Not Found" })
    }
    else {
        if (user) {
            let currentPassword = req.body.currentPassword;
            console.log(currentPassword);
            console.log(user.password)
            bcrypt.compare(currentPassword, user.password, (err, data) => {
                console.log(data);
                if (data) {
                    let newPassword = req.body.newPassword;
                    let passwordConfirmation = req.body.passwordConfirmation;
                    if (passwordConfirmation === currentPassword) {
                        // console.log("oldpass match with new password so you not upadet")
                        res.json({ message: "New Password and Current Passsword are same!", status: 'failed' })
                    }
                    else {
                        if (newPassword === passwordConfirmation) {
                            bcrypt.hash(newPassword, 10, (err, psw) => {
                                var hash = psw
                                UserModel.updateOne({ _id: req.params.id }, { password: hash, ConfirmPass: hash }, (err, data) => {
                                    if (err) {
                                        res.json({ message: "Something went Wrong in Update User data...", status: 404, data: err })
                                    }
                                    else {
                                        if (data) {
                                            const token = jwt.sign(
                                                {
                                                    Password: hash
                                                },
                                                process.env.JWT_KEY,
                                                {
                                                    expiresIn: "24h"
                                                }
                                            );
                                            res.json({ message: "User Password Change Successfully!!!....", status: 200, data: data })
                                        }
                                    }
                                })
                            })
                        }
                        else {
                            res.json({ message: "New Password and Confirm Password Did not matched!", status: 'failed'})
                        }
                    }
                }
                else {
                    res.send({ message: "Current password not match with register user Password!", status: 'failed' })
                }
            })
        }
    }
}