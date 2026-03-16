const request = require('supertest');
const book = require('../fixtures/book.json');


const getBooks = async () => {
    const response = await request(process.env.BASE_URL)
        .get('/books')
        .set('Content-Type', 'application/json')

    return response;
}

module.exports = {
    getBooks
}
