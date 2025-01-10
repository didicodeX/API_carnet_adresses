const router = require('express').Router();
const contactRoutes = require('./contact.routes');
const userRoutes = require('./user.routes');
const authenticateUser = require('../middlewares/auth.middleware');

// Protéger les routes de contact avec le middleware auth
router.use('/contacts', authenticateUser, contactRoutes);

// Routes utilisateur (certaines peuvent être publiques)
router.use('/users', userRoutes);

module.exports = router;

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: "Enregistrer un utilisateur"
 *     description: "Enregistre un nouvel utilisateur."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Utilisateur enregistré avec succès"
 *       400:
 *         description: "Bad request"
 *       500:
 *         description: "Internal server error"
 */
