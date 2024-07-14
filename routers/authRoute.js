const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
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
        const userToken = generateToken({_id: newUser._id});
        res.status(200).send({ status: "Success", message: "Sign up successful", userToken });
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
          const userToken = generateToken(user._id);
          res.status(200).send({ status: "Success", message: "Login success", userToken });
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

// Scope to make is async
const generateToken = (data) => {
  if(data) {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ data: data }, key);
    return token;
  } else {
    throw "Data is Empty";
  }
}

const decodeToken = (token) => {
  // verify a token symmetric - synchronous
  const key = process.env.SECRET_KEY;
  try {
    const decoded = jwt.verify(token, key);
    console.log(decoded);
  } catch(err) {
    console.error("Something went wrong")
  }
}

module.exports = router;
