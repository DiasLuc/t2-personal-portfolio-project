const request = require('supertest');
const user = require('../fixtures/user.json');

const registerUser = async (username, password) => {
    const bodyRegister = { ...user };
        bodyRegister.username = username;
        bodyRegister.password = password;
    const response = await request(process.env.BASE_URL)
        .post('/register')
        .set('Content-Type', 'application/json')
        .send(bodyRegister)

    return response;
};

module.exports = {
    registerUser
};