import { createError } from "../error.js";
import User from "../models/User.js";

//Update User

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(createError(403, "Action not allowed"));
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(err);
  }
};

//Delete user

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(createError(403, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully!");
  } catch (error) {
    next(error);
  }
};

//Get user

export const getUser = async (req, res, next) => {
  const userId = req.params.id;
  if (!userId) return next(createError(404, "User does not exist!"));
  const user = await User.findById(userId);
  res.status(200).json(user);
};
