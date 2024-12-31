const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  console.log("Middleware d'authentification activé.");
  console.log("Cookies reçus :", req.cookies);

  const token = req.cookies?.accessToken;

  if (!token) {
    console.warn("Aucun token fourni dans le cookie.");
    return res.status(401).json({ message: "Non autorisé." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.warn("Token expiré.");
        return res.status(401).json({ message: "Session expirée. Veuillez vous reconnecter." });
      }
      console.error("Erreur de vérification du token :", err.message);
      return res.status(403).json({ message: "Token invalide ou expiré." });
    }

    console.log("Utilisateur décodé du token :", user);
    req.user = user;
    next();
  });
};


module.exports = authenticateUser;
