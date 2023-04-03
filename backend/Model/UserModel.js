var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    ConfirmPass: {
        type: String,
        required: true
    },
    logintoken: {
        type: String,
    }
})

var UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;