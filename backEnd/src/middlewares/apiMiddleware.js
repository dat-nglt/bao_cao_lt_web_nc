import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "defaultSecretKey";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.loggedInUser = decoded.existUser;
    next();
  });
};

export default authenticateToken;
