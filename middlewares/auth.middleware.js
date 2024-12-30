const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  console.log("Middleware d'authentification activé.");
  console.log("Cookies reçus :", req.cookies);

  const token = req.cookies.accessToken;
  console.log("Token reçu :", token);
  if (!token) {
    console.warn("Aucun token fourni dans le cookie.");
    return res.status(401).json({ message: "Non autorisé. Aucun token." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Erreur de vérification du token :", err.message);
      return res.status(403).json({ message: "Token invalide ou expiré." });
    }

    console.log("Utilisateur authentifié :", user);
    req.user = user;
    next();
  });
};


module.exports = authenticateUser;
