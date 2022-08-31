const { addMinutes, isAfter } = require('date-fns');
const AdminAttendance = require('../models/AdminAttendance');
const error = require('../utils/error');


/**
 * GET Enable the attendance system.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {*}
 */
const getEnable = async (_req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: 'RUNNING' });
        if (running) throw error('Already Running!', 400);

        const attendance = new AdminAttendance({});
        await attendance.save();
        return res.status(201).json({ message: 'Success', attendance });

    } catch (error) {
        next(error);
    }
};


/**
 * GET Disable the attendance system.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {*}
 */
const getDisable = async (_req, res, next) => {
    try {
        const running = await AdminAttendance.findOne({ status: 'RUNNING' });
        if (!running) throw error('Not Running', 400);

        running.status = 'COMPLETED';
        await running.save();
        return res.status(200).send(running);

    } catch (error) {
        next(error);
    }
};


/**
 * GET Runnings the attendace system.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {*}
 */
const getStatus = async (_req, res, next) => {
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
    getEnable,
    getDisable,
    getStatus
};