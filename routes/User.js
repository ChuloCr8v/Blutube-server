import express from "express";
import {
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controllers/User.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

router.get("/find/:id", verifyToken, getUser);

router.put("/subscribe/:id", verifyToken, subscribe);

router.put("/unsubscribe/:id", verifyToken, unsubscribe);

export default router;
