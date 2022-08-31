const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByProperty, createNewUser } = require('./user');
const error = require('../utils/error');

// Register User..
const registerService = async ({name, email, password}) => {
    let user = await findUserByProperty('email', email);
    if (user) throw error('User already exists', 400);

    // Hashing Password..
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return createNewUser({name, email, password: hash});
};

// Login User..
const loginService = async ({email, password}) => {
    // Try to find the user..
    const user = await findUserByProperty('email', email);

    // if not found the user..
    if (!user) throw error('User not Found!', 400);

    // compare the password with founded user..
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw error('Wrong Password!', 400);

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        acountStatus: user.acountStatus
    };

    // JWT token generate..
    const token = jwt.sign(payload, 'SECRET-KEY');
    return token;
};

module.exports = {
    loginService,
    registerService
};