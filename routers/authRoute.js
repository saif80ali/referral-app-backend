const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Validations = require("../validators/userValidation.js");
const validationFunctions = new Validations();

const UserDB = require("../model/user_information/UserDB.js");

const saltCount = 8; //For faster Hashing use rounds=8 : ~40 hashes/sec. reference :- https://www.npmjs.com/package/bcrypt

router.post(
  "/signup",
  validationFunctions.validateFullName(),
  validationFunctions.validateEmail(),
  validationFunctions.validatePassword(),
  validationFunctions.validate,
  async (req, res) => {
    try {
      let checkUserExists = await UserDB.findOne({ email: req.body.email });
      if (checkUserExists) {
        const errorDetails = [{
          fieldname: "email",
          message: `User with email ${req.body.email} already exists`,
        }];
        res.status(400).send({ status: "Failure", errors: errorDetails });
      } else {
        const salt = await bcrypt.genSalt(saltCount);
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);
        const newUserInfo = {
          name: req.body.name,
          email: req.body.email,
          password: encryptedPassword,
        };
        let newUser = new UserDB(newUserInfo);
        await newUser.save();
        savedUser = newUser.toObject(); // Convert Mongoose document to plain JavaScript object
        delete savedUser.password; // Remove 'password' field from the object
        res.status(200).send({ status: "Success", user: savedUser });
      }
    } catch (e) {
      console.error(e);
      res.status(400).send({ error: "Some error ocurred" });
    }
  }
);

router.post(
  "/login",
  validationFunctions.validateEmail(),
  validationFunctions.validatePassword(),
  validationFunctions.validate,
  async (req, res) => {
    try {
      const user = await UserDB.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).send({
          status: "Failure",
          errors: [
            {
              fieldname: "email",
              message: `User with email ${req.body.email} does not exist. Please create a new account.`,
            },
          ],
        });
      } else {
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          res.status(200).send({ status: "Success", message: "Login success" });
        } else {
          res.status(200).send({
            status: "Failure",
            errors: [
              {
                fieldname: "password",
                message: `Incorrect password.`,
              },
            ],
          });
        }
      }
    } catch (e) {
      console.error(e);
      res.status(400).send({ error: "Some error ocurred" });
    }
  }
);

module.exports = router;
