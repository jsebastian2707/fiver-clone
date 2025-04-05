const jwt = require ("jsonwebtoken");
const dotenv = require ("dotenv");

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "supersecreto";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No autorizado" });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authenticate;