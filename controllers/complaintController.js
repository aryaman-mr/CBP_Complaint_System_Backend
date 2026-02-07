const Complaint = require('../models/Complaint');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendStatusEmail = async (email, name, status, complaintId) => {
  const subject = `Complaint ${status} - CricketBatPro`;
  const message = `Dear ${name},\n\nYour complaint (ID: ${complaintId}) has been ${status.toLowerCase()}.\n\nThank you for using CricketBatPro.`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text: message
  });
};

const createComplaint = async (req, res) => {
  try {
    const complaintData = {
      ...req.body,
      userId: req.user._id,
      proofFile: req.file?.filename
    };
    
    const complaint = await Complaint.create(complaintData);
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    
    await sendStatusEmail(complaint.email, complaint.name, status, complaint._id);
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createComplaint, getUserComplaints, getAllComplaints, updateComplaintStatus };