import express from "express";
import {
  deleteUser,
  getUser,
  searchUser,
  subscribe,
  unsubscribe,
  updateUser,
} from "../controllers/User.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

router.get("/find/:id", getUser);

router.put("/subscribe/:id", verifyToken, subscribe);

router.put("/unsubscribe/:id", verifyToken, unsubscribe);

router.get("/search-user/", searchUser);

export default router;
