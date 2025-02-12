const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const { productPool } = require("./db");

const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ messsage: "no token pass" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    const user = await productPool.query("SELECT *FROM users WHERE id = $1", [
      decode.userId,
    ]);
    if (user.rows[0].role !== "admin") {
      return res.status(404).json({ message: "Admins only" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: "invalid token" });
  }
};

const verifyToken = (req, res, next) => {


  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};
module.exports = {verifyToken,verifyAdmin};
