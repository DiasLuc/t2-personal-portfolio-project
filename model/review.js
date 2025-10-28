// In-memory Review model
const reviews = [
	// Reviews for book 1
	{ id: 1, bookId: 1, userId: 1, username: 'alice', rating: 9, text: 'Excellent resource for developers.' },
	{ id: 2, bookId: 1, userId: 2, username: 'bob', rating: 8, text: 'Very practical advice.' },
	// Reviews for book 2
	{ id: 3, bookId: 2, userId: 1, username: 'alice', rating: 10, text: 'A must-read for clean code.' },
	{ id: 4, bookId: 2, userId: 2, username: 'bob', rating: 7, text: 'Good, but a bit repetitive.' },
	// Reviews for book 3
	{ id: 5, bookId: 3, userId: 2, username: 'bob', rating: 6, text: 'Interesting concepts.' },
];

module.exports = reviews;