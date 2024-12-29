const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // Récupérer le token depuis les headers
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Accès refusé : Token manquant." });

    // Vérifier et décoder le token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedToken : ",decodedToken);
    req.user = decodedToken; // Attacher les infos utilisateur à la requête
    next(); // Passer à la suite si tout est OK
  } catch (err) {
    res
      .status(500)
      .json({ message: "Token invalide ou expiré.", error: err.message });
  }
};

module.exports = auth;
