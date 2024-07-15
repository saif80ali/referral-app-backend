const jwt = require("jsonwebtoken");
const {isValidObjectId} = require("mongoose");
const key = process.env.SECRET_KEY;

function validateToken(req, res, next) {
  try {
    const token = req.header("authorization");
    const decoded = jwt.verify(token, key);
    if(isValidObjectId(decoded.data)) {
        req.userid = decoded.data;
        next();
    } else {
        res.status(401).send({message: "Unauthorized access"});
    }
  } catch (err) {
    console.error(err);
    res.status(401).send({message: "Unauthorized access"});
  }
}

module.exports = validateToken;
