const { Schema, model } = require('mongoose');

// Schema..
const profileSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    avatar: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// Model..
const Profile = model('Profile', profileSchema);
module.exports = Profile;