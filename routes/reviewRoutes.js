const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/auth');

router.post('/:bookId/reviews', authenticateToken, reviewController.addReview);
router.delete('/reviews/:reviewId', authenticateToken, reviewController.deleteReview);

module.exports = router;