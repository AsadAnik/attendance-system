const router = require('express').Router();
// Routes..
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const adminAttendanceRoutes = require('./admin-attendance');
const studentAttendanceRoutes = require('./student-attendance')
// Middlewares..
const authenticate = require('../middleware/auth');

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', authenticate, usersRoutes);
router.use('/api/v1/admin/attendance', authenticate, adminAttendanceRoutes);
router.use('/api/v1/student/attendance', authenticate, studentAttendanceRoutes);

module.exports = router; 