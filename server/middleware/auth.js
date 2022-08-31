const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function authenticate(req, res, next){
    try {
        let token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: 'Unauthorized!' });

        token = token.split(' ')[1];
        const decoded = jwt.verify(token, 'SECRET-KEY');
        const user = await User.findById(decoded._id);
        if (!user) return res.status(401).json({ message: 'Unauthorized!' });

        // passing new property with mutable req. with user data..
        req.user = user;
        next();

    } catch(error) {
        return res.status(400).json({ message: 'Invalid token', error });
    }

}

module.exports = authenticate;