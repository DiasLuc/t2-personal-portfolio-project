const request = require('supertest');
const book = require('../fixtures/book.json');


const addBook = async (token, title, author) => {
    const bodyBook = { ...book };
        bodyBook.title = title;
        bodyBook.author = author;
    const response = await request(process.env.BASE_URL)
        .post('/books')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyBook)
    return response;
}

module.exports = {
    addBook
}
