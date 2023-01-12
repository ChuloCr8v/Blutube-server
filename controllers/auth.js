import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import {createError} from '../error.js'
import jwt from 'jsonwebtoken'

//Signup 
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({...req.body, password: hash})
    await newUser.save()
    
    res.status(200).json({
      message: 'New User Created Successfully', 
      user: newUser
    })
  } catch(err) {
   // next(createError(404, 'problem creating account'))
    next(err)
  }
}

//Signin
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username})
    if(!user) return next(createError(404, 'User not found'))
    const verifyPassword = await bcrypt.compare(req.body.password, user.password)
    if(!verifyPassword) return next(createError(400, 'Wrong credentials'))
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SEC_PHRASE)
    
    const {password, ...others} = user._doc 
    res.cookie('access_token', token, {
      httpOnly: true,
    }).status(200).json({
      others, 
      token 
    }) 
     
  } catch (err) {
    next(err)
  }
}
