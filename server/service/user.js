const User  = require('../models/User');
const error = require('../utils/error');

// Find all users..
const findUsers = () => {
    return User.find();
};

// Find user by property here..
const findUserByProperty = (key, value) => {
    if (key === '_id'){
        return User.findById(value);
    }
    return User.findOne({ [key]: value });
};

// Create user..
const createNewUser = async ({ name, email, password, roles, accountStatus }) => {
    const foundUser = await findUserByProperty('email', email);
    if (foundUser) throw error('User already exists!', 400);

    const user = new User({ 
        name, 
        email, 
        password,
        roles: roles ? roles : ['STUDENT'],
        accountStatus: accountStatus ? accountStatus : 'PENDING'
    });
    return user.save();
};

// Update user..
const updateUser = (id, data) => {
    return User.findByIdAndUpdate(id, {...data}, {new: true});
};

module.exports = {
    findUserByProperty,
    createNewUser,
    findUsers,
    updateUser
};