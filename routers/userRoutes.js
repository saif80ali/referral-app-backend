const express = require("express");
const userRouter = express.Router();
const validateToken = require("../middleware/validateToken.js");

const UserDetailsDB = require("../model/user_information/userDetailsDB.js");

userRouter.get("/get-details", validateToken, async (req, res) => {
    try {
        data = await UserDetailsDB.findOne({"userID": req.userid});
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({status:"Failure", message:"Something went wrong"});
    }
})

userRouter.post("/set-details", validateToken, async (req, res) => {
    try {
        if (req.userid == req.body.userID) {
            data = await UserDetailsDB.findOne({"userID": req.userid});
            if (data) {
                res.status(400).send({status:"Failure", message:"User details are present"});
            } else {
                const userDetails = {
                    userID: req.body.userID,
                    organizationName: req.body.organizationName,
                    city: req.body.city,
                    startDate: req.body.startDate,
                    currentlyWorking: req.body.currentlyWorking,
                };
                details = new UserDetailsDB(userDetails);
                await details.save();
                res.status(200).send({status:"Success", data:details});
            }
        } else {
            res.status(401).send({message: "Invalid user ID"});
        }
        
    } catch (e) {
        console.error(e)
        res.status(400).send({status:"Failure", message:"Something went wrong"});
    }
})
module.exports = userRouter;