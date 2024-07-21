const express = require("express");
const userRouter = express.Router();
const validateToken = require("../middleware/validateToken.js");
const upload = require("../helper/fileUpload.js");

const UserDetailsDB = require("../model/user_information/userDetailsDB.js");

userRouter.get("/get-details", validateToken, async (req, res) => {
    try {
        data = await UserDetailsDB.findOne({"userID": req.userid});
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({status:"Failure", message:"Something went wrong"});
    }
})

userRouter.post("/set-details", validateToken, upload.single('resume'), async (req, res) => {
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
                    resumeName: req.file.filename
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


//Rote to test file upload
userRouter.post("/upload", validateToken, upload.single('uploaded_file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ status: "Failure", message: "No file uploaded" });
        }
        res.status(200).send({ fileName: req.file.filename, body:req.body });
    } catch (e) {
        console.error(e)
        res.status(400).send({status:"Failure", message:"Something went wrong"});
    }
})
module.exports = userRouter;