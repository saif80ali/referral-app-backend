const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const UserDB = require("../model/UserDB.js");

const saltCount = 8; //For faster Hashing use rounds=8 : ~40 hashes/sec. reference :- https://www.npmjs.com/package/bcrypt

router.post("/signup", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(saltCount);
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);
        const newUserInfo = {
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
        }
        let newUser = new UserDB(newUserInfo);
        await newUser.save();
        res.status(200).send({message:"success", newUser});
    } catch(e) {
        console.error(e)
        res.status(400).send({error: "Some error ocurred"});
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await UserDB.findOne({email:req.body.email});
        if (!user) {
            res.status(400).send({status:"Failure", message:"Invalid user email"});
        } else {
            let match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                res.status(200).send({status:"Success", message:"Login success"});
            } else {
                res.status(200).send({status:"Failure", message:"Incorrect password"});
            }
        }
    } catch(e) {
        console.error(e)
        res.status(400).send({error: "Some error ocurred"});
    }
})

module.exports = router;