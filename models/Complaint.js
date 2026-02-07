const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  casino: { type: String, required: true },
  complaintType: { type: String, required: true },
  description: { type: String, required: true },
  proofFile: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Declined'], default: 'Pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);