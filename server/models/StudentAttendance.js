const { Schema, model } = require('mongoose');

// Schema..
const studentAttendanceSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    adminAttendance: { 
        type: Schema.Types.ObjectId, 
        ref: 'AdminAttendance' 
    }
},
    { timestamps: true }
);

// Model..
const StudentAttendance = model('StudentAttendance', studentAttendanceSchema);
module.exports = StudentAttendance;