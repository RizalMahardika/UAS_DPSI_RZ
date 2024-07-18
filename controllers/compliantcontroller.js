const Complaint = require('../models/compliantmodel');

const createComplaint = async (req, res) => {
  const { description, evidence } = req.body;
  const userId = req.user.id;

  const complaint = new Complaint(null, userId, description, evidence, 'Pending', new Date());
  await complaint.save();

  res.send({ message: 'Complaint submitted successfully.', complaint });
};

const getComplaintsByUser = async (req, res) => {
  const userId = req.user.id;
  const complaints = await Complaint.findByUserId(userId);

  res.send({ complaints });
};

const getComplaintStatus = async (req, res) => {
  const complaintId = req.params.id;
  const complaint = await Complaint.findById(complaintId);

  if (!complaint) return res.status(404).send({ message: 'Complaint not found.' });
  if (complaint.userId !== req.user.id) return res.status(403).send({ message: 'Access denied.' });

  res.send({ complaint });
};

module.exports = { createComplaint, getComplaintsByUser, getComplaintStatus };
