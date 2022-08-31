const router = require('express').Router();
const { registerController, loginController } = require('../controllers/auth');

/**
 * Post user with Register new user
 * @route /api/v1/auth/register
 * @method POST
 * @visibility Public
 */
router.post('/register', registerController);

/**
 * Post user with Login user
 * @route /api/v1/auth/login
 * @method POST
 * @visibility Public
 */
router.post('/login', loginController);

module.exports = router;