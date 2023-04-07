const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port= process.env.PORT || 9000


app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://chenryjonathan2000:ciRspXS8dg5nTUX6@cluster0.cearjkd.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{console.log(`MongoDb Connected`);});

const Location = require('../models/location.model');
const User = require('../models/user.model');

// location routes
app.get('/locations', async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
});

app.post('/locations', async (req, res) => {
  const location = new Location(req.body);
  await location.save();
  res.json(location);
});

app.put('/locations/:id', async (req, res) => {
  const { id } = req.params;
  const location = await Location.findByIdAndUpdate(id, req.body, { new: true });
  res.json(location);
});

app.delete('/locations/:id', async (req, res) => {
  const { id } = req.params;
  await Location.findByIdAndDelete(id);
  res.json({ message: 'Location deleted successfully' });
});

// user routes
app.get('/users', async (req, res) => {
  const users = await User.find().populate('location');
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted successfully' });
});
  
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  
