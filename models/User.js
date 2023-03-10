import express from "express";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    subscribedTo: {
      type: [String],
    },
    subscribedUsers: {
      type: [String],
    },
  },
  { timeStamps: true }
);

export default mongoose.model("user", UserSchema);
