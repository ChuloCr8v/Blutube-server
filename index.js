import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

const app = express()
mongoose.set('strictQuery', false)

//Middlewares
app.use(cookieParser()) 
app.use(express.json()) 
dotenv.config() 

const connect = () => {
  mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
    console.log('Connection to Database Successful!')
  }).catch((err) => {throw err}) 
}


//Routes
import User from './routes/User.js'
import auth from './routes/auth.js'

//Use routes
app.use('/api/', User)
app.use('/api/auth/', auth)

//middleware
app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  
  res.status(status).json({
    success: false,
    message, 
    status
  })
})

 

app.listen(8000, () => {
  connect()
  console.log("server connected")
})