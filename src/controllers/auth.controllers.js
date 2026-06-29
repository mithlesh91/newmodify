const jwt = require('jsonwebtoken')
const usermodel = require('../models/user.models')
const bcrypt = require('bcryptjs')
const blocklist = require('../models/blocklist')
const redis = require('../config/chechs')

async function register(req,res){
    const{username,email,password} = req.body

     const userexist = await usermodel.findOne(
        {$or:[{email},{username}]}
     )
    if(userexist){
        return res.status(400).json({
            message:"user already exists"
        })
    }
    
    // const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,10)

    const user =await usermodel.create({
        username,
        email,
        password:hashedpassword
    })
    
    const token = jwt.sign({
        id:user._id,
        user:user.email
    },process.env.jwt_secret,{
        expiresIn:"7d"
    })

    res.cookie("token",token,)

    res.status(201).json({
        
        message:"user created successfully",
        user
    })

    
}

async function login(req,res){
    const{email,username,password} = req.body
    const user =await usermodel.findOne({
        $or:[{email},{username}]
    }).select("+password")
    if(!user){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const ismatch =await bcrypt.compare(password, user.password)
    if(!ismatch){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
        user:user.email
    },process.env.jwt_secret,{
        expiresIn:"1d"
    })

    res.cookie("tokens",token)
    res.status(200).json({
        message:"user logged in successfully",
        user
    
    })

}

async function getuser(req,res){
    const user = await usermodel.findById(req.user.id)
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    res.status(200).json({
        user
    })
}

async function logout(req,res){
    const token = req.cookies.tokens
    res.clearCookie("tokens")

    // await blocklist.create({
    //     token
    // })
    await redis.set(token,Date.now().toString())

    res.status(200).json({
        message:"logout successfully"
    })
}

module.exports = {
    register,
    login,
    getuser,
    logout
}