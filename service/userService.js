const users = require('../model/user');
const bcrypt = require('bcryptjs');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

async function registerUser(username, password) {
  if (findUserByUsername(username)) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);
  return user;
}

async function validateUser(username, password) {
  const user = findUserByUsername(username);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : null;
}

module.exports = { registerUser, validateUser, findUserById, findUserByUsername };