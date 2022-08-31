const { Schema, model } = require('mongoose');

// Schema..
const userSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 30
    },
    email: { 
        type: String, 
        required: true,
        validate: {
            validator: function(value){
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
            },
            message: props => `Invalid Email: ${props.value}`
        }
    },
    password: { 
        type: String,
        minlength: [7, 'Password is too short, must be at least 8 characters'],
        required: true
    },
    roles: { 
        type: [String],
        required: true,
        default: ['STUDENT']
    },
    accountStatus: { 
        type: String,
        enum: ['ACTIVE', 'REJECTED', 'PENDING'],
        default: 'PENDING',
        required: true
    }
});

// Model..
const User = model('User', userSchema);
module.exports = User;