import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import createError from "../api/utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.useId !== user._id.toString()) {
      return next(403, "You can only delete your account!");
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).send("Deleted!");
  } catch (err) {
    next(err);
  }
};
