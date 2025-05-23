import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allusersExceptMe = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(allusersExceptMe);
  } catch (error) {
    console.error("Error in getUserForSidebar:", error.message),
      res.status(500).json({
        message: "Internal server error",
      });
  }
};

export default getUserForSidebar;
