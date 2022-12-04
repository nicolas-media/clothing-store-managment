import express from 'express';
import User from '../models/user';
import { hashPassword, comparePasswords } from '../lib/password';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
});

router.post('/', async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = new User({ username, password: hashedPassword, isAdmin });
  await user.save();
  res.json(user);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, isAdmin } = req.body;
  const user = await User.findById(id);
  if (username) user.username = username;
  if (password) {
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
  }
  if (isAdmin) user.isAdmin = isAdmin;
  await user.save();
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.sendStatus(204);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.sendStatus(401);
  const passwordMatches = await comparePasswords(password, user.password);
  if (!passwordMatches) return res.sendStatus(401);
  res.json(user);
});

export const userRouter = router;
