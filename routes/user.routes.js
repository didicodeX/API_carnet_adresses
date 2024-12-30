const router = require('express').Router();
const { registerUser, loginUser, getProfile, getAllUsers, refreshToken } = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/auth.middleware');


// Routes publiques
router.post('/register', registerUser); // Inscription
router.post('/login', loginUser); // Connexion
router.post('/refresh-token', refreshToken); // Nouvelle route pour renouveler le token

// Route protégée
router.get('/me', authenticateUser, getProfile); // Récupérer les infos de l'utilisateur connecté

router.get("/test-cookies", (req, res) => {
  console.log("Cookies reçus :", req.cookies);
  res.status(200).json(req.cookies);
});

router.get("/", getAllUsers);

module.exports = router;
