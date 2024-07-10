const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 50,
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

UserDB = mongoose.model("user", userSchema)
module.exports = UserDB;