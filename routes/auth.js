import express from "express";
import { signup, signin } from "../controllers/auth.js";

const router = express.Router();

//Signup
router.post("/signup", signup);

//Signin
router.put("/signin", signin);

export default router;
