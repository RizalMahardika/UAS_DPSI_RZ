const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const register = async (req, res) => {
  const { email, password, name } = req.body;

  let user = await User.findByEmail(email);
  if (user) return res.status(400).send({ message: 'User already registered.' });

  const hashedPassword = await bcrypt.hash(password, 10);

  user = new User(null, email, hashedPassword, name, 'Mahasiswa');
  await user.save();

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.header('Authorization', token).send({ id: user.id, email: user.email, name: user.name });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);
  if (!user) return res.status(400).send({ message: 'Invalid email or password.' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send({ message: 'Invalid email or password.' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.header('Authorization', token).send({token, id: user.id, email: user.email, name: user.name });
};

module.exports = { register, login };
