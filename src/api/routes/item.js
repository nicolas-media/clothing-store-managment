import express from 'express';
import Item from '../models/item';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const item = await Item.findById(id);
  res.json(item);
});

router.post('/', async (req, res) => {
  const { name, price, barcode, inStock } = req.body;
  const item = new Item({ name, price, barcode, inStock });
  await item.save();
  res.json(item);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, barcode, inStock } = req.body;
  const item = await Item.findById(id);
  if (name) item.name = name;
  if (price) item.price = price;
  if (barcode) item.barcode = barcode;
  if (inStock) item.inStock = inStock;
  await item.save();
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.sendStatus(204);
});

export const itemRouter = router;
