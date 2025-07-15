import express from "express";
import {
  getMessages,
  sendMessage,
  createConversation,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Message endpoints
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
// Conversation endpoints
// router.post("/conversation", protectRoute, createConversation);

export default router;
