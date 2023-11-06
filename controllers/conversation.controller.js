import Conversation from "../models/conversation.model.js";
import createError from "../utils/createError.js";

export const getConversationsHandler = async (req, res, next) => {
  try {
    const convs = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    );

    return res.status(200).send(convs);
  } catch (err) {
    next(err);
  }
};

export const createConversationHandler = async (req, res, next) => {
  const newConversation = new Conversation({
    // sellerId needs to be the first
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userid,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    const conv = await newConversation.save();

    return res.status(201).send(conv);
  } catch (err) {
    next(err);
  }
};

export const updateConversationHandler = async (req, res, next) => {
  try {
    const conv = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          readByBuyer: true,
          readBySeller: true,
          //   ...(req.isSeller ? {readBySeller: true} : readByBuyer: true)
        },
      },
      {
        new: true, // returns update query
      }
    );

    return res.status(200).send(conv);
  } catch (err) {}
};

export const getConversationHandler = async (req, res, next) => {
  try {
    const conv = await Conversation.findOne({ id: req.params.id }).sort({
      updatedAt: -1,
    });

    if (!conv) return next(createError(404, "No conversation yet!"));

    return res.status(200).send(conv);
  } catch (err) {
    next(err);
  }
};
