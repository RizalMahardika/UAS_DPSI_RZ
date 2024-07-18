const express = require('express');
const { createComplaint, getComplaintsByUser, getComplaintStatus } = require('../controllers/compliantcontroller');
const authMiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/complaints', authMiddleware('Mahasiswa'), createComplaint);
router.get('/complaints', authMiddleware('Mahasiswa'), getComplaintsByUser);
router.get('/complaints/:id', authMiddleware('Mahasiswa'), getComplaintStatus);

module.exports = router;
