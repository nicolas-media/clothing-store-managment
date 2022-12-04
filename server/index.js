const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Item = require('./models/item');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/inventoryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an express app
const app = express();


// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());

// Create a route for retrieving all items in the inventory
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a route for adding new items to the inventory
app.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
