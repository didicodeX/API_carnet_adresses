const router = require('express').Router();
const { registerUser, loginUser, getProfile, getAllUsers, refreshToken } = require('../controllers/user.controller');
const auth = require('../middlewares/auth');


// Routes publiques
router.post('/register', registerUser); // Inscription
router.post('/login', loginUser); // Connexion
router.post('/refresh-token', refreshToken); // Nouvelle route pour renouveler le token

// Route protégée
router.get('/me', auth, getProfile); // Récupérer les infos de l'utilisateur connecté

router.get("/", getAllUsers);

module.exports = router;
