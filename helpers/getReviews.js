const request = require('supertest');

const getReviews = async (bookId) => {
    const response = await request(process.env.BASE_URL)
        .get(`/books/${bookId}/reviews`)
        .set('Content-Type', 'application/json')
        .send()
    return response;
}

module.exports = {
    getReviews
}
