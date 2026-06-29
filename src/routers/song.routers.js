const express = require('express')
const upload = require('../middleware/upload.middleware')
const uploadsong = require('../controllers/songControllers')

const router = express.Router()

router.post('/',upload.single('song'),uploadsong.songupload)
router.get('/',uploadsong.getallsongs)

module.exports=router