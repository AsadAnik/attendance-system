const mongoose = require('mongoose');

// DB Connection function..
async function connectDB(URL){
    const connection = await mongoose.connect(URL);
    return connection;
}

module.exports = connectDB;