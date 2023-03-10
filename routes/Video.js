import express from "express";
import {
  addView,
  deleteVideo,
  getByTags,
  getVideo,
  getVideos,
  likeVideo,
  random,
  searchVideos,
  trend,
  updateVideo,
  uploadVideo,
} from "../controllers/Video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/upload-video", verifyToken, uploadVideo);
router.put("/update-video/:id", verifyToken, updateVideo);
router.delete("/delete-video/:id", verifyToken, deleteVideo);
router.get("/:id", getVideos);
router.get("/videos", getVideo);
router.put("/add-view/:id", addView);
router.get("/random", random);
router.get("/trending", trend);
//router.get("/subscriptions", verifyToken, subscribe);
router.put("/like-video/:id", verifyToken, likeVideo);
router.get("/tags/", getByTags);
router.get("/search/", searchVideos);

export default router;
