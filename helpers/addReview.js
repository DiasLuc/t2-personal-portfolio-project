const request = require('supertest');
const review = require('../fixtures/review.json');

const addReview = async (userAuthToken, bookId, rating, text) => {
    const bodyAdd = { ...review };
        bodyAdd.rating = rating;
        bodyAdd.text = text;
    const response = await request(process.env.BASE_URL)
        .post(`/books/${bookId}/reviews`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send(bodyAdd)

    return response;
};

module.exports = {
    addReview
};