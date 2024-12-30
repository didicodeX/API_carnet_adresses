const router = require('express').Router();
const { registerUser, loginUser, getProfile, getAllUsers } = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controller'); // Importation du contrôleur utilisateur

// Routes publiques
router.post('/register', registerUser); // Inscription
router.post('/login', loginUser); // Connexion
router.post('/refresh-token', userController.refreshToken); // Nouvelle route pour renouveler le token

// Route protégée
router.get('/me', auth, getProfile); // Récupérer les infos de l'utilisateur connecté

router.get("/", getAllUsers);

module.exports = router;
