const Topic = require('../models/Topic');

exports.createTopic = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTopic = new Topic({ title, description });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.status(200).json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ message: "Topic deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
