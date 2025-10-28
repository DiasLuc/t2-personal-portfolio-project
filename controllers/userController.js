const userService = require('../service/userService');
const { generateToken } = require('../middleware/auth');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  try {
    const user = await userService.registerUser(username, password);
    res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const user = await userService.validateUser(username, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken(user);
  res.json({ token });
};