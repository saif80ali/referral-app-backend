const express = require('express')
const router = express.Router();
const UserDB = require("../model/UserDB.js");

router.post("/signup", async (req, res) => {
    try {
        let newUser = new UserDB(req.body);
        await newUser.save();
        res.status(200).send({message:"success", user: newUser});
    } catch(e) {
        console.error(e)
        res.status(400).send({error: "Some error ocurred"});
    }
})

module.exports = router;