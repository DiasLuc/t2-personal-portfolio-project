const { expect } = require('chai');
require('dotenv').config();

const user = require('../../fixtures/user.json');

const { loginUser } = require('../../helpers/loginUser.js');

describe('POST /login', () => {
    it('Should return a JWT token when valid credentials are provided, and return status code 200', async () => {
        const response = await loginUser('alice', 'password123');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('token');
        expect(response.body).to.not.have.property('error');
        expect(response.body.token).to.be.a('string'); 
    });

    it('Should fail to login when valid username, but invalid password are provided, and return status code 401', async () => {
        const response = await loginUser('alice', 'wrongpassword');
        expect(response.statusCode).to.equal(401);
        expect(response.body).to.not.have.property('token');
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.equal('Invalid credentials');
    });

    it('Should fail to login when a password is passed in without a username, and return status code 400', async () => {
        const response = await loginUser('', 'password123'); 
        expect(response.statusCode).to.equal(400);
        expect(response.body).to.not.have.property('token');
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.equal('Username and password required');
    });

    it('Should fail to login when a username is passed in without a password, and return status code 400', async () => {
        const response = await loginUser('alice', '');
        expect(response.statusCode).to.equal(400);
        expect(response.body).to.not.have.property('token');
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.equal('Username and password required');
    });
});