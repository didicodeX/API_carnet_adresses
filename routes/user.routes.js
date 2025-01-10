const router = require('express').Router();
const { registerUser, loginUser, getProfile, getAllUsers, refreshToken, logoutUser } = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/auth.middleware');


// Routes publiques
router.post('/register', registerUser); // Inscription
router.post('/login', loginUser); // Connexion
router.post('/refresh-token', refreshToken); // Nouvelle route pour renouveler le token
router.post('/logout', authenticateUser, logoutUser);

// Route protégée
router.get('/me', authenticateUser, getProfile); // Récupérer les infos de l'utilisateur connecté

router.get("/test-cookies", (req, res) => {
  console.log("Cookies reçus :", req.cookies);
  res.status(200).json(req.cookies);
});

router.get("/", getAllUsers);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur.
 *     tags:
 *       - Utilisateurs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Utilisateur enregistré avec succès.
 *       400:
 *         description: Erreur de validation.
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connexion d'un utilisateur.
 *     tags:
 *       - Utilisateurs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Connexion réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5..."
 *       401:
 *         description: Identifiants invalides.
 */

/**
 * @swagger
 * /users/refresh-token:
 *   post:
 *     summary: Renouvelle un token d'accès.
 *     tags:
 *       - Utilisateurs
 *     responses:
 *       200:
 *         description: Token renouvelé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5..."
 */

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Déconnexion d'un utilisateur.
 *     tags:
 *       - Utilisateurs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie.
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté.
 *     tags:
 *       - Utilisateurs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations récupérées avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123456"
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *       401:
 *         description: Non autorisé.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs (route publique).
 *     tags:
 *       - Utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "123456"
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 */


module.exports = router;
