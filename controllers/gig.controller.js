import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const newGigHandler = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only sellers can create a gig!"));

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const gig = await newGig.save();

    return res.status(201).json(gig);
  } catch (err) {
    next(err);
  }
};

export const deleteGigHandler = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);

    return res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getGigHandler = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) next(createError(404, "Gig not found!"));

    return res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};

