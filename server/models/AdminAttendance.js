const { Schema, model } = require('mongoose');

// Schema..
const adminAttendanceSchema = new Schema({
    timeLimit: {
        type: Number,
        required: true,
        max: 30,
        min: 5,
        default: 5
    },
    status: {
        type: String,
        required: true,
        enum: ["RUNNING", "COMPLETED"],
        default: 'RUNNING'
    }
},
    { timestamps: true }
);

// Model..
const AdminAttendance = model('AdminAttendance', adminAttendanceSchema);
module.exports = AdminAttendance;