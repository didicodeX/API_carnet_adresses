const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_SECRET, NODE_ENV } = process.env;

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifier si l'email existe deja
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email deja utilise." });

    // Créer l'utilisateur
    await User.create({ name, email, password });

    res.status(201).json({ message: "Compte cree avec succes." });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable." });

    // Verifier si le mot de passe est correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Mot de passe incorrect." });

    // Créer le token
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "15m",
    });
    console.log("Token accessToken défini !", accessToken);
    // Créer le refresh token
    const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("Token refreshToken défini !", refreshToken);

    // Stocker les tokens dans les cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "None",
      domain: "carnet-adresses-50e2ff3ffe95.herokuapp.com",
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
    });
    console.log("Cookie accessToken défini !");
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "None",
      domain: "carnet-adresses-50e2ff3ffe95.herokuapp.com",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });
    console.log("Cookie refreshToken défini !");

    res
      .status(200)
      .json({ message: "Connexion réussie !", accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    console.log("ID utilisateur reçu : ", req.user.userId);

    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      console.warn("Aucun utilisateur trouvé pour l'ID :", req.user.userId);
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Erreur dans getProfile :", err); // Log complet
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users)
      return res.status(404).json({ message: "Aucun utilisateur trouve." });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // Récupérer le refresh token depuis le cookie

    if (!refreshToken)
      return res.status(401).json({ message: "Non autorisé." });

    // Vérifier le refresh token
    jwt.verify(refreshToken, JWT_SECRET, async (err, user) => {
      if (err)
        return res.status(403).json({ message: "Token invalide ou expiré." });

      // Vérifier si le token correspond à l'utilisateur
      const dbUser = await User.findById(user.userId);
      if (!dbUser || dbUser.refreshToken !== refreshToken) {
        return res.status(403).json({ message: "Token invalide." });
      }

      // Générer un nouveau access token
      const newAccessToken = jwt.sign({ userId: user.userId }, JWT_SECRET, {
        expiresIn: "15m",
      });

      // Réenvoyer le nouveau token dans un cookie
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "None",
        domain: "carnet-adresses-50e2ff3ffe95.herokuapp.com",
        maxAge: 2 * 60 * 1000, // 2 minutes
      });

      res.status(200).json({ message: "Token rafraîchi avec succès." });
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Ajoute cette route dans ton controller pour la déconnexion
const logoutUser = async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "None",
      domain: "carnet-adresses-50e2ff3ffe95.herokuapp.com",
      maxAge: 0, // Expire immédiatement
    });

    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "None",
      domain: "carnet-adresses-50e2ff3ffe95.herokuapp.com",
      maxAge: 0, // Expire immédiatement
    });

    res.status(200).json({ success: true, message: "Déconnexion réussie." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur lors de la déconnexion.", error: err.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  refreshToken,
  logoutUser,
};
