const bookService = require('../service/bookService');

exports.listBooks = (req, res) => {
  res.json(bookService.listBooks());
};

exports.addBook = (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author required' });
  const book = bookService.addBook(title, author);
  res.status(201).json(book);
};

exports.getReviews = (req, res) => {
  const bookId = parseInt(req.params.bookId);
  if (isNaN(bookId)) return res.status(400).json({ error: 'Invalid book ID' });
  const reviews = bookService.getReviewsForBook(bookId);
  res.json(reviews);
};