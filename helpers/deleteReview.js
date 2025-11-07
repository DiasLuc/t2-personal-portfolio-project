const request = require('supertest');
const review = require('../fixtures/review.json');

const deleteReview = async (userAuthToken, reviewId) => {
    const response = await request(process.env.BASE_URL)
        .delete(`/reviews/${reviewId}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${userAuthToken}`)
        .send()

    return response;
};

module.exports = {
    deleteReview
};