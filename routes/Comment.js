import express from "express";
import {
  addComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/Comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/add-comment/:id", verifyToken, addComment);
router.get("/get-comment/:id", getComment);
router.put("/update-comment/:id", verifyToken, updateComment);
router.delete("/delete-comment/:id", verifyToken, deleteComment);

export default router;
