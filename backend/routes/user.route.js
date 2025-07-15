import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import getUserForSidebar from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", protectRoute, getUserForSidebar);

// Get user by ID (protected route)
// router.get("/:id", protectRoute, getUserById);

export default router;
