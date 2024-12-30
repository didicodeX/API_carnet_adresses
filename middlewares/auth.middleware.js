const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.accessToken; // Récupérer le token depuis le cookie

  if (!token) return res.status(401).json({ message: "Non autorisé." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide ou expiré." });

    req.user = user; // Ajoute les infos utilisateur à la requête
    next();
  });
};

module.exports = authenticateUser;
