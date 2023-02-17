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

//Subscribe

export const subscribe = async (req, res, next) => {
  if (req.user.id === req.params.id)
    return res
      .status(401)
      .json("You are not allowed to subscribe to your own channel");

  try {
    const verifyUser = await User.findById(req.params.id);
    const verified = verifyUser.subscribedUsers.filter(
      (user) => user === req.user.id
    );

    if (verifyUser.subscribedUsers.includes(verified))
      return res.status(501).json("User already subscribed");

    await User.findByIdAndUpdate(req.params.id, {
      $push: { subscribedUsers: req.user.id },
    });
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedTo: req.params.id },
    });
    res.status(200).json("Subscription Successful!");
  } catch (error) {
    next(error);
  }
};

//Unsubscribe

export const unsubscribe = async (req, res, next) => {
  try {
    await findByIdAndUpdate(req.params.id, {
      $pull: { subscribedUsers: req.user.id },
    });
    await findByIdAndUpdate(req.user.id, {
      $pull: { subscribedTo: req.params.id },
    });
    res.status(200).json("Unsubscribed Successfully!");
  } catch (error) {
    next(error);
  }
};

//Search user
export const searchUser = async (req, res, next) => {
  const search = req.query.search;
  try {
    const searchUser = await User.find({
      username: { $regex: search, $options: "i" },
    });
    res.status(200).json(searchUser);
  } catch (error) {
    next(error);
  }
};
