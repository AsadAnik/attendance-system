const router = require('express').Router();
const { getAttendance, getAttendanceStatus } = require('../controllers/student-attendance');

/**
 * Status Of Student Attendance.
 * @route /api/v1/student/attendance/status
 * @method GET
 * @visibility Private
 */
router.get('/status', getAttendanceStatus);

/**
 * Make Students Attendance.
 * @route /api/v1/student/attendance/:id
 * @method Get
 * @visibility Private
 */
router.get('/:id', getAttendance);


module.exports = router;