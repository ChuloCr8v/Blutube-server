import jwt from 'jsonwebtoken'
import {createError} from './error.js'
export const verifyToken = (req, res, next) => {
   const token = req.cookies.access_token 
   /* jwt.verify(token, process.env.JWT_SEC_PHRASE, (err, user) => {
    console.log(user)
  }) */
  if (!token ) console.log(next(createError(400, 'error'))) 
   // console.log(token)
  next()
}