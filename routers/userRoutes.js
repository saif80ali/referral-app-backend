const express = require("express");
const userRouter = express.Router();
const validateToken = require("../middleware/validateToken.js");

const UserCompanyDetails = require("../model/user_information/userCompanyDetailsDB.js");

userRouter.post("/get-details", validateToken,async (req, res) => {
    try {
        res.status(200).send(req.userid);
    } catch (e) {
        res.status(400).send({status:"Failure", message:"Incorrect password"})
    }
})
module.exports = userRouter;