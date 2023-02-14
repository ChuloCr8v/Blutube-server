import express from "express";
import {
  addView,
  deleteVideo,
  getVideo,
  likeVideo,
  random,
  trend,
  updateVideo,
  uploadVideo,
} from "../controllers/Video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/upload-video", verifyToken, uploadVideo);
router.put("/update-video/:id", verifyToken, updateVideo);
router.delete("/delete-video/:id", verifyToken, deleteVideo);
router.get("/", getVideo);
router.put("/add-view/:id", addView);
router.get("/random", random);
router.get("/trending", trend);
//router.get("/subscriptions", verifyToken, subscribe);
router.put("/like-video/:id", verifyToken, likeVideo);

export default router;
