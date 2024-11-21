import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("http://localhost:3000/dang-nhap");
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.redirect("http://localhost:3000/dang-nhap");
    }

    req.loggedInUser = decoded.existUser;
    next();
  });
};

export default authenticateToken;
