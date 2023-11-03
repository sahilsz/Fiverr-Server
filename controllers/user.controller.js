import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUserHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || req.userId !== user._id.toString()) {
      return next(createError(403, "You can only delete your account!"));
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).send("Deleted!");
  } catch (err) {
    next(err);
  }
};

export const getUserHandler = async (req, res, next) => {
  try {
    console.log("user", req.params.id);
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send("User not found!");

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
