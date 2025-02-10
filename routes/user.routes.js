const router = require('express').Router();
const { registerUser, loginUser, getProfile, getAllUsers, refreshToken, logoutUser,updateUser } = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/auth.middleware');

// Routes publiques
router.post('/register', registerUser); // Inscription
router.post('/login', loginUser); // Connexion
router.post('/refresh-token', refreshToken); // Nouvelle route pour renouveler le token
router.delete('/logout', authenticateUser, logoutUser);

// Route protégée
router.patch("/:id",authenticateUser, updateUser);
router.get('/me', authenticateUser, getProfile); // Récupérer les infos de l'utilisateur connecté

router.get("/", getAllUsers);

module.exports = router;
