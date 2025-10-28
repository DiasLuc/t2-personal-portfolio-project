const reviews = require('../model/review');

function addReview(bookId, userId, username, rating, text) {
  if (rating < 1 || rating > 10) throw new Error('Rating must be between 1 and 10');
  const review = { id: reviews.length + 1, bookId, userId, username, rating, text };
  reviews.push(review);
  return review;
}

function deleteReview(reviewId, userId) {
  const index = reviews.findIndex(r => r.id === reviewId && r.userId === userId);
  if (index === -1) throw new Error('Review not found or not authorized');
  reviews.splice(index, 1);
  return true;
}

function getReviewsForBook(bookId) {
  return reviews.filter(r => r.bookId === bookId);
}

module.exports = { addReview, deleteReview, getReviewsForBook };