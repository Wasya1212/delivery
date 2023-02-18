const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://localhost/my-database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Define Order model
const orderSchema = new mongoose.Schema({
  coordinates: String,
  time: String,
  username: String,
});
const Order = mongoose.model('Order', orderSchema);

// Use bodyParser middleware
app.use(bodyParser.json());

// Endpoint 1
app.get('/hello', async (req, res) => {
  // Create a new user with random values
  const newUser = new User({
    email: `user${Math.floor(Math.random() * 100)}@example.com`,
    name: `User ${Math.floor(Math.random() * 100)}`,
  });
  await newUser.save();
  
  res.send(`Created new user: ${newUser.name} (${newUser.email})`);
});

// Endpoint 2
app.post('/order', async (req, res) => {
  const { coordinates, time, username } = req.body;
  const newOrder = new Order({ coordinates, time, username });
  await newOrder.save();

  res.send(`Created new order for user ${newOrder.username} with coordinates ${newOrder.coordinates} at ${newOrder.time}`);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});