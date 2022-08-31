const router = require('express').Router();
const userController = require('../controllers/users');

/**
 * Get user by id or email
 * @route /api/v1/users/userId
 * @method GET
 * @visibility Private
*/
router.get('/:userId', userController.getUserById); 

/** 
 * Update user by id
 * @route /api/v1/users/userId
 * @method PUT
 * @visibility Private
*/
router.put('/:userId', userController.putUserById);

/** 
 * Update user by id
 * @route /api/v1/users/userId
 * @method PATCH
 * @visibility Private
*/
router.patch('/:userId', userController.patchUserById);

/** 
 * Delete user by id
 * @route /api/v1/users/userId
 * @method DELETE
 * @visibility Private
*/
router.delete('/:userId', userController.deleteUserById);

/** 
 * Get all users, including
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/v1/users?sort=["by","name"]
 * @method GET 
 * @visibility Private
*/
router.get('/', userController.getUsers);

/**
 * Create a new user
 * @route /api/v1/users
 * @method POST
 * @visibility Public
*/
router.post('/', userController.postUser);


module.exports = router;