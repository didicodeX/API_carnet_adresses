const router = require('express').Router();
const { getAllUsers, createUser, loginUser } = require('../controllers/user.controller');

router.get('/', getAllUsers);


router.post('/register', createUser);
router.post('/login', loginUser);




module.exports = router;