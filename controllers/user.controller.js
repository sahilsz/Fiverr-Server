import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.useId !== user._id.toString()) {
      return res.status(403).send("You can only delete your account!");
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).send("Deleted!");
  } catch (err) {
    console.log(err);
  }
};
