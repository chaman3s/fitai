import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
export function getUserFromCookie(req) {
  const token = req.cookies?.token; // ✅ THIS IS THE FIX

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET); // { id, email }
  } catch (error) {
    return null;
  }
}