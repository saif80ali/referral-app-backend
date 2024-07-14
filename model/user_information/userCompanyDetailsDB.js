const mongoose = require("mongoose");
const {Schema} = mongoose;

const userCompanyDetails = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    organizationName: {
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
}, { userCompanyDetails: 'user' })

const UserCompanyDetailsDB = mongoose.model("user", userCompanyDetails);
module.exports = UserCompanyDetailsDB;