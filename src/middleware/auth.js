const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const auth = req.headers.authorization?.split(" ")[1];
  if (!auth) return res.status(401).send("No token");
  try {
    req.user = jwt.verify(auth, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};
