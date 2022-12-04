import express from 'express';
import { itemRouter } from './routes/item';
import { userRouter } from './routes/user';

const router = express.Router();

router.use('/items', itemRouter);
router.use('/users', userRouter);

export default router;
