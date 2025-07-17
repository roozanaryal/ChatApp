import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // Get all users except the logged-in user
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    // For each user, find the conversation and last message
    const usersWithLastMessage = await Promise.all(
      allUsers.map(async (user) => {
        // Find the conversation between logged-in user and this user
        const conversation = await Conversation.findOne({
          participants: { $all: [loggedInUserId, user._id] },
        }).populate({
          path: "messages",
          options: { sort: { createdAt: -1 }, limit: 1 },
        });

        let lastMessage = null;
        if (conversation && conversation.messages.length > 0) {
          lastMessage = await Message.findById(conversation.messages[0]._id)
            .populate("sender", "username")
            .populate("receiver", "username");
        }

        return {
          ...user.toObject(),
          lastMessage,
        };
      })
    );

    res.status(200).json(usersWithLastMessage);
  } catch (error) {
    console.error("getUserForSidebar: error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default getUserForSidebar;