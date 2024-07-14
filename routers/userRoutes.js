const express = require("express");
const userRouter = express.Router();

const UserCompanyDetails = require("../model/user_information/userCompanyDetailsDB.js");

userRouter.post("/setCompanyDetails", async (req, res) => {
    try {

    } catch (e) {
        res.status(400).send({status:"Failure", message:"Incorrect password"})
    }
})