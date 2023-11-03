import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReviewHandler = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const isReviewed = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (isReviewed)
      return next(
        createError(403, "You have already create a review for this gig!")
      );

    // Update the stars on Gig
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    const review = await newReview.save();

    return res.status(201).send(review);
  } catch (err) {
    next(err);
  }
};

export const getReviewHandler = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.id });

    return res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
