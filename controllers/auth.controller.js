import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import createError from "../utils/createError.js";

/**
 * It registers a new user using the data from the request body and returns the created user in the response.
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 *
 * @param {Object} res - The response object.
 * @param {string} next
 * @async
 */
export const registerUserHandler = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const user = await newUser.save();
    const { password, ...info } = user._doc;

    res.status(201).send(info);
  } catch (err) {
    next(err);
  }
};

export const loginUserHandler = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const jwt_key = process.env.JWT_KEY;

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      jwt_key
    );

    const { password, ...info } = user._doc;
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: "false",
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logoutUserHandler = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send({ msg: "User has successfully logged out!" });
  } catch (err) {
    next(err);
  }
};
