import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const getUserForSidebar = async (req, res) => {
  console.log('getUserForSidebar: req.user', req.user);

  try {
    console.log("user",req.user);
    const loggedInUserId = req.user._id;
    console.log('getUserForSidebar: loggedInUserId', loggedInUserId);
    const allusersExceptMe = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(allusersExceptMe);
  } catch (error) {
    console.error('getUserForSidebar: error', error);
    console.error("Error in getUserForSidebar:", error.message),
      res.status(500).json({
        message: "Internal server error",
      });
  }
};



export default getUserForSidebar;
