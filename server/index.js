const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const roles = require('roles');

const Item = require('./models/item');
const User = require('./models/user');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/inventoryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an express app
const app = express();

// Use the body-parser middleware to parse the request body
app.use(bodyParser.json());

// Initialize passport for authentication
app.use(passport.initialize());

// Define the roles for the user management system
roles.use('access', (req, action) => {
  if (req.user) {
    return req.user.hasRole(action);
  } else {
    return false;
  }
});

// Create a route for registering new users
app.post('/users/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a route for logging in users
app.post('/users/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Invalid username or password',
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      return res.json({ user });
    });
  })(req, res);
});

// Protect the routes for managing the inventory and billing
app.use(passport.authenticate('jwt', { session: false }));
app.use(roles.can('access'));

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

// Create a route for managing the billing
app.post('/billing', (req, res) => {
  // TODO: Implement billing logic here
  res.send('Billing processed successfully');
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});