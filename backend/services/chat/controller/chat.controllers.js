import Conversation from "../models/conversitions.model.js";
import Message from "../models/message.model.js";
export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("userId", userId);
    const conversation = new Conversation({ userId });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const conversations = await Conversation.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveMessage = async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;

    // Implementation for saving message
    const message = new Message.create({ conversationId, role, content }).sort({
      createdAt: -1,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateConversation = async (req, res) => {
  try {
    const { id, title } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(
      id,
      { title },
      { new: true },
    );
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({
      createdAt: -1,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
