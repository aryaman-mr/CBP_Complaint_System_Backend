const express = require('express');
const multer = require('multer');
const path = require('path');
const { auth, adminAuth } = require('../middleware/auth');
const { createComplaint, getUserComplaints, getAllComplaints, updateComplaintStatus } = require('../controllers/complaintController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/', auth, upload.single('proofFile'), createComplaint);
router.get('/my-complaints', auth, getUserComplaints);
router.get('/all', auth, adminAuth, getAllComplaints);
router.put('/:id/status', auth, adminAuth, updateComplaintStatus);

module.exports = router;