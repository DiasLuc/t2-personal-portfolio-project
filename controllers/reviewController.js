const reviewService = require('../service/reviewService');

exports.addReview = (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const { rating, text } = req.body;
  if (!rating || !text) return res.status(400).json({ error: 'Rating and text required' });
  try {
    const review = reviewService.addReview(bookId, req.user.id, req.user.username, rating, text);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteReview = (req, res) => {
  const reviewId = parseInt(req.params.reviewId);
  try {
    reviewService.deleteReview(reviewId, req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};