const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const { JWT_SECRET, NODE_ENV } = process.env;
const domain = NODE_ENV === 'production' ? 'api.myaddressesbook.com' : 'localhost';

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
			expiresIn: "24h",
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
			secure: true,
			sameSite: "None",
			domain,
			maxAge: 24 * 60 * 60 * 1000, // 1 jour
		});
		console.log("Cookie accessToken défini !");
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "None",
			domain,
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
		});
		console.log("Cookie refreshToken défini !");

		res
			.status(200)
			.json({ message: "Connexion réussie !", accessToken, refreshToken, user: user });
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
				expiresIn: "24h",
			});

			// Réenvoyer le nouveau token dans un cookie
			res.cookie("accessToken", newAccessToken, {
				httpOnly: true,
				secure: true,
				sameSite: "None",
				domain,
				maxAge: 24 * 60 * 60 * 1000, // 1 jour
			});

			res.status(200).json({ message: "Token rafraîchi avec succès." });
		});
	} catch (err) {
		res.status(500).json({ message: "Erreur serveur", error: err.message });
	}
};

// Ajoute cette route dans ton controller pour la déconnexion
// je doit avoir une requete delete /logout en non une requete post
const logoutUser = (req, res) => {
	try {
			res.clearCookie("accessToken", { httpOnly: true, secure: true });
			res.clearCookie("refreshToken", { httpOnly: true, secure: true });
			res.status(200).json({ success: true, message: "Déconnexion réussie." });
	} catch (err) {
			res.status(500).json({ success: false, message: "Erreur lors de la déconnexion.", error: err.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const { id } = req.params;

		// Vérifier si l'ID est un ObjectId valide
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ success: false, message: "ID utilisateur invalide" });
		}

		// Préparer l'objet de mise à jour
		const updateFields = { name, email };

		// Hacher le mot de passe s'il est fourni
		if (password) {
			const salt = await bcrypt.genSalt(10);
			updateFields.password = await bcrypt.hash(password, salt);
		}

		// Mettre à jour l'utilisateur
		const user = await User.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

		if (!user) {
			return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
		}

		res.status(200).json({ success: true, message: "Utilisateur mis à jour", data: user });
	} catch (error) {
		res.status(500).json({ success: false, message: "Erreur lors de la mise à jour", error: error.message });
	}
};

module.exports = {
	registerUser,
	loginUser,
	getProfile,
	getAllUsers,
	refreshToken,
	logoutUser,
	updateUser
};
