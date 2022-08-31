const userService = require('../service/user');
const error = require('../utils/error');

/**
 * Get all users.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns *
 */
const getUsers = async (req, res, next) => {
    /**
     * TODO: filter, sort, pagination, select
     */
    try {
        const users = await userService.findUsers();
        return res.status(200).json(users);

    } catch(error){
        next(error);
    }
};

/**
 * Get user by id.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns *
 */
const getUserById = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await userService.findUserByProperty('_id', userId);

        if (!user) throw error('User not found!', 404);
        return res.status(200).json({ message: 'User found', user });

    } catch(error) {
        next(error);
    }
};


/**
 * Post a new user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns *
 */
const postUser = async (req, res, next) => {
    const { name, email, password, roles, accountStatus } = req.body;

    try {
        const user = await userService.createNewUser({ name, email, password, roles, accountStatus});
        return res.status(201).json({ message: 'User created', user });

    } catch(error) {
        next(error);
    }
};

/**
 * Update with PUT request.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns *
 */
const putUserById = async (req, res, next) => {
    const { userId } = req.params;
    const { name, email, roles, accountStatus } = req.body;

    try {
        const user = await userService.updateUser(userId, { name, email, roles, accountStatus });
        if (!user) throw error('User not Found!', 404);
        return res.status(200).json(user);

    } catch(error){
        next(error);
    }
};


/**
 * Update with PATCH request.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns *
 */
const patchUserById = async (req, res, next) => {
    const { userId } = req.params;
    const { name, roles, accountStatus } = req.body;

    try {
        const user = await userService.findUserByProperty('_id', userId);
        if (!user) throw error('User not Found!', 404);

        user.name = name ?? user.name;
        user.roles = roles ?? user.roles;
        user.accountStatus = accountStatus ?? user.accountStatus;

        await user.save();
        return res.status(200).send(user);

    } catch(error) {
        next(error);
    }

};


/**
 * Delete / Remove a user from the DB.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns *
 */
const deleteUserById = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const user = await userService.findUserByProperty('_id', userId);
        if (!user) throw error('User not Found!', 404);
        await user.remove();
        return res.status(203).send();

    } catch(error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUserById,
    patchUserById,
    deleteUserById
};