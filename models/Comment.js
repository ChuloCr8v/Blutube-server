import express from 'express'
import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
  },
  videoId: {
    type: String, 
    required: true,
  },
  text: {
    type: String, 
    required: true,
  },
}, timeStamps: true)

export default mongoose.model('comment', CommentSchema)