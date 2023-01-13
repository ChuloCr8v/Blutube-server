import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/User.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/user/:id", verifyToken, updateUser);

router.delete("/user/:id", verifyToken, deleteUser);

router.get("/user/find/:id", verifyToken, getUser);

export default router;
