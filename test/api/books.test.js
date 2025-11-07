const request =  require('supertest');
const { expect } = require('chai');
require('dotenv').config();

const { getToken } = require('../../helpers/getToken.js');
const { addBook } = require('../../helpers/addBook.js');
const { getReviews } = require('../../helpers/getReviews.js');
const { addReview } = require('../../helpers/addReview.js');

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
        let token;
        beforeEach(async () =>{
            token = await getToken('alice', 'password123');
        });
        it('Should return status code 201, and add book to the database, returning an object with the book id, title, and author', async () => {
            let bookTitle = 'First Book Title';
            let bookAuthor = 'First Book Author';
            const response = await addBook(token, bookTitle, bookAuthor);
            
            expect(response.statusCode).to.equal(201);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('title');
            expect(response.body.title).to.equal(bookTitle);
            expect(response.body).to.have.property('author');
            expect(response.body.author).to.equal(bookAuthor);
            expect(response.body).to.not.have.property('error');
        });

        it('Should return status code 400, and fail to add book to the database when no book title is passed in, returning an error message stating that title and author are required', async () => {
            let bookTitle = '';
            let bookAuthor = 'Second Book Author';
            const response = await addBook(token, bookTitle, bookAuthor);
            
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Title and author required');
        });

        it('Should return status code 400, and fail to add book to the database when no book author is passed in, returning an error message stating that title and author are required', async () => {
            let bookTitle = 'Third Book Title';
            let bookAuthor = '';
            const response = await addBook(token, bookTitle, bookAuthor);
            
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Title and author required');
        });

        it('Should return status code 401, and fail to add book to the database when no authentication token is passed in, returning an error message stating that token is required', async () => {
            token = '';
            let bookTitle = 'Fourth Book Title';
            let bookAuthor = 'Fourth Book Author';
            const response = await addBook(token, bookTitle, bookAuthor);
            
            expect(response.statusCode).to.equal(401);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Token required');
        });

        it('Should return status code 403, and fail to add book to the database when an invalid authentication token is passed in, returning an error message stating that token is invalid', async () => {
            token = 'Invalid Token';
            let bookTitle = 'Fourth Book Title';
            let bookAuthor = 'Fourth Book Author';
            const response = await addBook(token, bookTitle, bookAuthor);
            
            expect(response.statusCode).to.equal(403);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Invalid token');
        });

    });

    describe('GET /books/{bookId}/reviews', () => {
        it('Should return status code 200, and return a list of book review objects for the valid bookId passed in', async () => {
            const response = await getReviews(2);
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(item => {
                expect(item).to.have.property('id');
                expect(item).to.have.property('bookId');
                expect(item).to.have.property('userId');
                expect(item).to.have.property('username');
                expect(item).to.have.property('rating');
                expect(item).to.have.property('text');
            });

        });

        it('Should return status code 400, and return an error stating that the bookId is invalid when invalid bookId is passed in', async () => {
            const response = await getReviews(99999999);
            expect(response.statusCode).to.equal(400);
            expect(response.body).to.have.property('error');
            expect(response.body.error).to.equal('Invalid book ID');
        });
    });

    describe('POST /books/{bookId}/reviews', () => {
        let token;
        beforeEach(async () =>{
            token = await getToken('alice', 'password123');
        });
        it('Should return status code 201, successfully add review to database when passing in valid rating, and review text. Should return the review object with its id, bookId, userId, username, rating, and text', async () => {
            let bookId = 2;
            let rating = 8;
            let reviewText = 'This is my review text';
            const response = await addReview(token, bookId, rating, reviewText);
            expect(response.statusCode).to.equal(201);
            expect(response.body.id).to.exist;
            expect(response.body.bookId).to.equal(bookId);
            expect(response.body.userId).to.exist;
            expect(response.body.username).to.exist;
            expect(response.body.rating).to.equal(rating);
            expect(response.body.text).to.equal(reviewText);

        });

        it('Should return status code 201, successfully add review to database, and return the review object with its id, bookId, userId, username, rating, and text', async () => {
            
        });
    });
});