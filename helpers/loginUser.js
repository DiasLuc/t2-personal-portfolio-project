const request = require('supertest');
const user = require('../fixtures/user.json');

const loginUser = async (username, password) => {
    const bodyLogin = { ...user };
        bodyLogin.username = username;
        bodyLogin.password = password;
    const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)

    return response;
}

module.exports = {
    loginUser
}
