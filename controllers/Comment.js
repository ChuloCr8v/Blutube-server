import Comment from "../models/Comment.js";

//Add comment

export const addComment = async (req, res, next) => {
  const newComment = new Comment({
    userId: req.user.id,
    videoId: req.params.id,
    ...req.body,
  });

  try {
    const addComment = await newComment.save();
    res.status(200).json(addComment);
  } catch (error) {
    next(error);
  }
};

//Get comment
export const getComment = async (req, res, next) => {
  try {
    const getComment = await Comment.findById(req.params.id);
    res.status(200).json(getComment);
  } catch (error) {
    next(error);
  }
};

//Update comment
export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId !== req.user.id)
      return res.status(200).json("You can only edit your own comment");
    const updateComment = await Comment.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Comment updated successfully");
  } catch (error) {
    next(error);
  }
};

//Delete comment

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.user.id) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment deleted successfully");
    } else return res.status(401).json("You can only delete your own comment");
  } catch (error) {
    next(error);
  }
};
