const mongoose = require("mongoose");
const {Schema} = mongoose;

const userDetails = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    profilePicture: {
        type: Buffer,
        contentType: String
    },
    resumeName: {
        type: String,
    },
    organizationName: {
        type: String,
    },
    city: {
        type: String,
    },
    startDate: {
        type: Date,
    },

    formUpdateDate: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'userDetails' })

const userDetailsDB = mongoose.model("userDetails", userDetails);
module.exports = userDetailsDB;