const { addMinutes, isAfter } = require('date-fns');
const AdminAttendance = require('../models/AdminAttendance');
const StudentAttendance = require('../models/StudentAttendance');
const error = require('../utils/error');

/**
 * GET request for getAttendance by id.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {*}
 */
const getAttendance = async (req, res, next) => {
    const { id } = req.params;

    try {
        /**
         * Step 1 - Find admin attendance by id
         * Step 2 - Check if it is running or not
         * Step 3 - Register entry
         */
        const adminAttendance = await AdminAttendance.findById(id);
        if (!adminAttendance) throw error('Invalid Attendance ID', 400);

        if (adminAttendance.status === 'COMPLETED') {
            throw error('Attendance Already Completed');
        }

        // Let Attend One Per Person Or Student At a Time..
        let attendance = await StudentAttendance.findOne({ adminAttendance: id, user: req.user._id });
        if (attendance) throw error('Already Registered', 400);

        attendance = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id
        });

        await attendance.save();
        return res.status(201).send(attendance);

    } catch (error) {
        next(error);
    }
};

/**
 * GET request for getAttendanceStatus.
 * @param {*} _req 
 * @param {*} res 
 * @param {*} next 
 * @returns {*}
 */
const getAttendanceStatus = async (_req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: 'RUNNING' });
        if (!running) throw error('Not Running yet!', 400);

        const started = addMinutes(new Date(running.createdAt), running.timeLimit);
        const isTimeOver = isAfter(new Date(), started);

        if (isTimeOver) {
            running.status = 'COMPLETED';
            await running.save();
        }

        return res.status(200).json(running);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAttendance,
    getAttendanceStatus
};