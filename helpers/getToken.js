
const { loginUser } = require('./loginUser.js');


const getToken = async (username, password) => {
    let token = (await loginUser(username, password)).body.token;
    return token;
}

module.exports = {
    getToken
}
