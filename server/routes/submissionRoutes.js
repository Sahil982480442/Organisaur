const express = require('express');
const router = express.Router();

const {
  submitResource,
  getAllSubmissions,
  approveSubmission,
  getApprovedByTopic,
  discardSubmission
} = require('../controllers/submissionController');

// ✅ Each handler must be a function
router.post('/', submitResource);
router.get('/all', getAllSubmissions);
router.put('/approve/:id', approveSubmission);
router.get('/approved/:topicId', getApprovedByTopic);
router.delete('/discard/:id', discardSubmission);


module.exports = router;



// const express = require('express');
// const router = express.Router();
// const {
//   createSubmission,
//   getSubmissionsByTopic,
//   approveSubmission,
//   getAllSubmissions,
//   getApprovedByTopic
// } = require('../controllers/submissionController');

// router.post('/', createSubmission);
// router.get('/all', getAllSubmissions);
// router.get('/:topicId', getSubmissionsByTopic);
// router.put('/approve/:id', approveSubmission);
// router.get('/approved/:topicId', getApprovedByTopic);


// module.exports = router;
