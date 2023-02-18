const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Allow cross-origin resource sharing
app.use(cors());

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://wasya1212:wasya1212@cluster0.v4ayb.mongodb.net/delivery?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Define Delivery model
const deliverySchema = new mongoose.Schema({
  coordinates: String,
  time: String,
  username: String,
});
const Delivery = mongoose.model('Delivery', deliverySchema);

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
  const newDelivery = new Delivery({ coordinates, time, username });
  await newDelivery.save();

  res.send(`Created new delivery for user ${newDelivery.username} with coordinates ${newDelivery.coordinates} at ${newDelivery.time}`);
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
