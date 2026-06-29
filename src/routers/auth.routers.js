const express = require('express')
const routers = express.Router()
// const validation = require('../middleware/validation')
const validation = require('../middleware/validate')
const authMiddleware = require('../middleware/auth.middleware')

const controllers = require('../controllers/auth.controllers')

routers.post('/register', validation.registerValidation, controllers.register)
  

routers.post('/login', controllers.login)
routers.get('/getuser', authMiddleware, controllers.getuser)
routers.get('/logout', authMiddleware, controllers.logout)

module.exports = routers