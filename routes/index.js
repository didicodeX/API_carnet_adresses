const router = require('express').Router();
const contactRoutes = require('./contact.routes');
const userRoutes = require('./user.routes');
const auth = require('../middlewares/auth.middleware');

// Protéger les routes de contact avec le middleware auth
router.use('/contacts', auth, contactRoutes);

// Routes utilisateur (certaines peuvent être publiques)
router.use('/users', userRoutes);

module.exports = router;
