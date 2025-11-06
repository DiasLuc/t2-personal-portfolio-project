const request =  require('supertest');
const { expect } = require('chai');
require('dotenv').config();

const user = require('../../fixtures/user.json');

const randomName = require('node-random-name');

const { registerUser } = require('../../helpers/registerUser.js');

describe('POST /register', () => {
    it('Should return status code 201, and user should be created successfully', async () => {
        let newUsername = randomName();
        let response = await registerUser(newUsername, '123456');
        expect(response.statusCode).to.equal(201);
        expect(response.body.username).to.equal(newUsername);
    });

    it('Should return status code 400, and fail to register user without a username', async () => {
        let response = await registerUser('', '123456');
        expect(response.statusCode).to.equal(400);
        expect(response.body.error).to.equal('Username and password required');
    });

    it('Should return status code 400, and fail to register user without a password', async () => {
        let newUsername = randomName();
        let response = await registerUser(newUsername, '');
        expect(response.statusCode).to.equal(400);
        expect(response.body.error).to.equal('Username and password required');
    });

    it('Should return status code 409, and fail to register a username that already exists', async () => {
        let newUsername = randomName();
        let response = await registerUser(newUsername, '123456');
        let secondResponse = await registerUser(newUsername, '123456');
        expect(response.statusCode).to.equal(201);
        expect(secondResponse.statusCode).to.equal(409);
        expect(secondResponse.body.error).to.equal('User already exists');
    });
    
});