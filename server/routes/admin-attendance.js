const router = require('express').Router();
const { getEnable, getDisable, getStatus } = require('../controllers/admin-attendance');

/**
 * Enable the attendance system.
 * @route /api/v1/admin/attendance/enable
 * @method GET
 * @visibility Private
*/
router.get('/enable', getEnable);

/**
 * Disable the attendance system.
 * @route /api/v1/admin/attendance/disable
 * @method GET
 * @visibility Private
*/
router.get('/disable', getDisable);

/**
 * 
 * @route /api/v1/admin/attendance/status
 * @method GET
 * @visibility Private
 */
router.get('/status', getStatus);

module.exports = router;