const express = require("express");
const userRouter = express.Router();
const validateToken = require("../middleware/validateToken.js");

const UserCompanyDetails = require("../model/user_information/userCompanyDetailsDB.js");
const UserDB = require("../model/user_information/UserDB.js");

userRouter.post("/get-details", validateToken,async (req, res) => {
    try {
        data = await UserDB.findById(req.userid);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({status:"Failure", message:"Incorrect password"})
    }
})
module.exports = userRouter;