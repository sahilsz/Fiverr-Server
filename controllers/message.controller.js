import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const createMessageHandler = async (req, res, next) => {
  const rawMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  try {
    const savedMessage = await rawMessage.save();
    await Conversation.findOneAndUpdate(
      {
        id: req.body.conversationId,
      },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    return res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const getMessagesHandler = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });

    console.log("messages", messages);
    return res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};
