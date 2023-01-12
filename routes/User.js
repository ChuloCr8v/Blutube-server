import express from 'express'
import auth from '../routes/auth.js'
import {verifyToken} from '../verifyToken.js'

const router = express.Router()

router.put('/user/:id', verifyToken, (req, res) => {
 //console.log(req.body)
})

export default router