const request =  require('supertest');
const { expect } = require('chai');
require('dotenv').config();

const randomName = require('node-random-name');
const { getToken } = require('../../helpers/getToken.js');
const { registerUser } = require('../../helpers/registerUser.js');
const { getReviews } = require('../../helpers/getReviews.js');
const { addReview } = require('../../helpers/addReview.js');
const { deleteReview } = require('../../helpers/deleteReview.js');


describe('Reviews', () => {
    describe('DELETE /reviews/{reviewId}', () => {
        const username = randomName();
        const password = '123456'
        
        before(async () => {
            await registerUser(username, password);
        });

        let token;
        let review;
        let reviewId;
        let bookId;
        beforeEach(async () =>{
            const rating = 4;
            const reviewText = "This is the review text";
            bookId = 2;
            token = await getToken(username, password);
            review = await addReview(token, bookId, rating, reviewText);
            reviewId = review.body.id;
        });

        it('Should return status code 204, successfully delete review when passing in valid user auth token, valid reviewId, and review belongs to user currently logged in', async () => {
            const response = await deleteReview(token, reviewId);
            const allReviews = await getReviews(bookId);
            expect(response.statusCode).to.equal(204);
            expect(allReviews.text).to.not.contain(review.text);
        });

        it('Should return status code 403, fail to delete review when passing in valid user auth token, valid reviewId, and review belongs to another user instead of user currently logged in', async () => {
            const secondToken = await getToken('alice', 'password123');
            const response = await deleteReview(secondToken, reviewId);
            const allReviews = await getReviews(bookId);
            expect(response.statusCode).to.equal(403);
            expect(response.body.error).to.equal('Invalid token or not authorized');
            expect(allReviews.text).to.contain(review.text);
        });

        it('Should return status code 401, fail to delete review when not passing in a user auth token, and a valid reviewId.', async () => {
            const response = await deleteReview('', reviewId);
            const allReviews = await getReviews(bookId);
            expect(response.statusCode).to.equal(401);
            expect(response.body.error).to.equal('Token required');
            expect(allReviews.text).to.contain(review.text);
        });

        it('Should return status code 403, fail to delete review when passing in an invalid user auth token, and a valid reviewId.', async () => {
            const response = await deleteReview('Invalid Token', reviewId);
            const allReviews = await getReviews(bookId);
            expect(response.statusCode).to.equal(403);
            expect(response.body.error).to.equal('Invalid token');
            expect(allReviews.text).to.contain(review.text);
        });

        it('Should return status code 404, fail to find and delete review when passing in an valid user auth token, and an invalid reviewId.', async () => {
            const response = await deleteReview(token, 9876546876546);
            const allReviews = await getReviews(bookId);
            expect(response.statusCode).to.equal(404);
            expect(response.body.error).to.equal('Invalid Token');
            expect(allReviews.text).to.contain(review.text);
        });

    });
});