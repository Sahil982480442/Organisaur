const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const topicRoutes = require('./routes/topicRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/topics', topicRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
