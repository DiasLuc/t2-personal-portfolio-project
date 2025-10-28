const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', bookController.listBooks);
router.post('/', authenticateToken, bookController.addBook);
router.get('/:bookId/reviews', bookController.getReviews);

module.exports = router;