import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "a2b8f4e7c1d9a6b3f5c8e2a1b4d7f9c0a3e6d1b8c5f7a9e2d4b1c8a0f3e5d7c9" , {
    expiresIn: "15d",
  });
  return token;
};
