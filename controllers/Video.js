import { createError } from "../error.js";
import Video from "../models/Video.js";

export const uploadVideo = async (req, res, next) => {
  const video = new Video({ userId: req.user.id, ...req.body });
  try {
    const newVideo = await video.save();
    res.status(200).json(newVideo);
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video does not exist"));
    if (req.user.id !== video.userId)
      return next(
        createError(403, "You are not authorized to update this video")
      );
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await video.findById(req.params.id);
    if (!video) return next(createError(404, "Video does not exist"));
    if (video.userId === req.user.id) {
      await Video.findByIdAndDelete(req.params.id);
    }
    res.status(200).json("Video deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const addView = async (req, res, next) => {
  try {
    await findByIdAndUpdate(req.params.id, {
      $set: { views: 1 },
    });
    res.status(200).json("Views updated successfully");
  } catch (error) {
    next(error);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

// export const subscribe = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const subscribedChannels = user.subscribedUsers;

//     const list = Promise.all(
//       subscribedChannels.map((channelId) => {
//         return Video.find({ userId: channelId });
//       })
//     );
//   } catch (error) {
//     next(error);
//   }
// };

export const likeVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    const verifyUserLike = video.likes.filter((like) => like === req.user.id);
    if (video.likes.includes(verifyUserLike)) {
      await Video.findByIdAndUpdate(req.params.id, {
        $pull: req.user.id,
      });
      res.status(200).status("You have unliked this video");
    } else {
      await Video.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.user.id },
      });
      res.status(200).status("You have liked this video");
    }
  } catch (error) {
    next(error);
  }
};
