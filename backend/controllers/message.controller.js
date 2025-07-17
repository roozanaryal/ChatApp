import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReciverSocketId } from "../socket/socket.js";
// import jwt from "jsonwebtoken";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    // const senderId = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id;
    const senderId = req.user._id; //as i have set in protect route

    if (!senderId || !reciverId) {
      return res.status(400).json({
        message: "Sender or receiver ID is missing",
        success: false,
      });
    }

    if (!message) {
      return res.status(400).json({
        message: "Message content is required",
        success: false,
      });
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, reciverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, reciverId],
        //messages will be empty array automatically as we set in models
      });
    }
    const newMessage = new Message({
      sender: senderId,
      receiver: reciverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    //SOCKET IO Functionality
    const reciverSocketId = getReciverSocketId(reciverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const createConversation = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { participantId } = req.body;
    if (!senderId || !participantId) {
      return res.status(400).json({
        message: "Sender or participant ID is missing",
        success: false,
      });
    }
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, participantId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, participantId],
      });
    }
    res.status(200).json({
      message: "Conversation created or already exists",
      conversation,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({
      message: "Failed to fetch messages",
      success: false,
      error: error.message,
    });
  }
};
