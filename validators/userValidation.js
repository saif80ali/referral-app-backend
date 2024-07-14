const { body, validationResult } = require('express-validator');

class UserValidations {
    validateFullName = () => {
        return body('name', "Invalid Full Name")
        .trim()
        .isAlpha("en-US", {ignore: " "})
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long')
        .isLength({ max: 50 })
        .withMessage('Name cannot exceed 50 characters')
      };
      
    // Validator function for 'email' field
    validateEmail = () => {
        return body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email address')
        .isLength({ max: 256 })
        .withMessage('Email cannot exceed 10 characters');
    };

    // Validator function for 'password' field 
    validatePassword = () => {
        return body('password')
        .trim()
        .isString()
        .isLength({ min: 3 })
        .withMessage('Password must be at least 3 characters long')
        .isLength({ max: 50 })
        .withMessage('Password cannot exceed 50 characters')
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*.])[0-9a-zA-Z!@#$%^&*.]{8,}$/)
        .withMessage('Password must contain at least one number and one special character (!@#$%^&*)')
    };
      
    // Validator middleware function to handle validation
    validate = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorDetails = errors.array().map(error => ({
                fieldname: error.path,
                message: error.msg
            }));
          return res.status(400).json({status: "Failure", errors: errorDetails });
        }
        next();
    };
}
module.exports = UserValidations;

