const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  console.log("Cookies reçus :", req.cookies); // Log des cookies

  const token = req.cookies.accessToken;

  if (!token) {
    console.warn("Aucun token fourni dans le cookie.");
    return res.status(401).json({ message: "Non autorisé." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Erreur de vérification du token :", err.message);
      return res.status(403).json({ message: "Token invalide ou expiré." });
    }

    req.user = user; // Associe l'utilisateur au req
    next();
  });
};

module.exports = authenticateUser;
