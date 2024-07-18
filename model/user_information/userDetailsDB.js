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
    resume: {
        type: Buffer,
        contentType: String
    },
    organizationName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    currentlyWorking: {
        type: Boolean,
        default: false,
    },
    formUpdateDate: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'userDetails' })

const userDetailsDB = mongoose.model("userDetails", userDetails);
module.exports = userDetailsDB;