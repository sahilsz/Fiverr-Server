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

