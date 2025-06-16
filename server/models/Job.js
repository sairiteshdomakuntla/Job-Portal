const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  salary_min: Number,
  salary_max: Number,
  job_type: {
    type: String,
    enum: ['full-time', 'part-time', 'internship', 'contract']
  },
  company: String,
  posted_by: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);
