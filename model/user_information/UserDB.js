const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        maxLength: 256,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 150,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "active",
    },
    userCreationDate: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'user' })

const UserDB = mongoose.model("user", userSchema)
module.exports = UserDB;