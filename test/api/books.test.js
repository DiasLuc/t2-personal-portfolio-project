const request =  require('supertest');
const { expect } = require('chai');
require('dotenv').config();

const { getToken } = require('../../helpers/getToken.js');
const { addBook } = require('../../helpers/addBook.js');


describe('Books', () => {
    describe('GET /books', () => {
        it('Should return status code 200, and a list with all the books in the database', async () => {
            const response = await request(process.env.BASE_URL)
                    .get('/books')
                    .set('Content-Type', 'application/json')
            
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(item => {
                expect(item).to.have.property('id');
                expect(item).to.have.property('title');
                expect(item).to.have.property('author');
            });
        });
    });

    describe('POST /books', () => {
        it('Should return status code 201, and add book to the database, returning an object with the book id, title, and author', async () => {
            let token = await getToken('alice', 'password123');
            let bookTitle = 'First Book Title';
            let bookAuthor = 'First Book Author';
            response = await addBook(token, bookTitle, bookAuthor);
            
            expect(response.statusCode).to.equal(201);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('title');
            expect(response.body.title).to.equal(bookTitle);
            expect(response.body).to.have.property('author');
            expect(response.body.author).to.equal(bookAuthor);
            expect(response.body).to.not.have.property('error');
        });

        it('Should return status code 400, and fail to add book to the database when no book title is passed in, returning an error message stating that title and author are required', async () => {
            let token = await getToken('alice', 'password123');
            let bookTitle = '';
            let bookAuthor = 'Second Book Author';
            response = await addBook(token, bookTitle, bookAuthor);
            
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Title and author required');
        });

        it('Should return status code 400, and fail to add book to the database when no book author is passed in, returning an error message stating that title and author are required', async () => {
            let token = await getToken('alice', 'password123');
            let bookTitle = 'Third Book Title';
            let bookAuthor = '';
            response = await addBook(token, bookTitle, bookAuthor);
            
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Title and author required');
        });

        it('Should return status code 401, and fail to add book to the database when no authentication token is passed in, returning an error message stating that token is required', async () => {
            let token = '';
            let bookTitle = 'Fourth Book Title';
            let bookAuthor = 'Fourth Book Author';
            response = await addBook(token, bookTitle, bookAuthor);
            
            expect(response.statusCode).to.equal(401);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Token required');
        });

        it('Should return status code 403, and fail to add book to the database when an invalid authentication token is passed in, returning an error message stating that token is invalid', async () => {
            let token = 'Invalid Token';
            let bookTitle = 'Fourth Book Title';
            let bookAuthor = 'Fourth Book Author';
            response = await addBook(token, bookTitle, bookAuthor);
            
            expect(response.statusCode).to.equal(403);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Invalid token');
        });

    });
});