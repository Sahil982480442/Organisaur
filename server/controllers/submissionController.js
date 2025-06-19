const Submission = require('../models/Submission');

exports.createSubmission = async (req, res) => {
  try {
    const { topicId, name, email, link, type } = req.body;
    const newSubmission = new Submission({ topicId, name, email, link, type });
    await newSubmission.save();
    res.status(201).json({ message: "Submitted for approval" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubmissionsByTopic = async (req, res) => {
  try {
    const topicId = req.params.topicId;
    const submissions = await Submission.find({ topicId, approved: true });
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ approved: false });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveSubmission = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Submission.findByIdAndUpdate(id, { approved: true }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getApprovedByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const approved = await Submission.find({ topicId, approved: true });
    res.status(200).json(approved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.submitResource = async (req, res) => {
  try {
    const { topicId, name, email, link, type } = req.body;
    const submission = new Submission({ topicId, name, email, link, type });
    await submission.save();
    res.status(201).json({ message: 'Submitted for approval' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
