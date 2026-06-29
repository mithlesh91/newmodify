
const {body, validationResult} = require('express-validator')

const validation = (req, res, next) => {
   const erors = validationResult(req)
   if(!erors.isEmpty()){
    return next()
   }
   res.status(400).json({message: erors.array().msg})
}

const registerValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min: 6,max:8}).withMessage('Password must be at least 6 characters long'),
    validation
]

module.exports = {registerValidation}