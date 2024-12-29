const router = require('express').Router();
const { registerUser, loginUser, getProfile, getAllUsers } = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

// Routes publiques
router.post('/register', registerUser); // Inscription
router.post('/login', loginUser); // Connexion

// Route protégée
router.get('/me', auth, getProfile); // Récupérer les infos de l'utilisateur connecté

router.get("/", getAllUsers);

module.exports = router;
