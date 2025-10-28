const books = require('../model/book');
const reviews = require('../model/review');

function listBooks() {
  return books;
}

function addBook(title, author) {
  const book = { id: books.length + 1, title, author };
  books.push(book);
  return book;
}

function getBookById(id) {
  return books.find(b => b.id === id);
}

function getReviewsForBook(bookId) {
  return reviews.filter(r => r.bookId === bookId);
}

module.exports = { listBooks, addBook, getBookById, getReviewsForBook };