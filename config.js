module.exports={
    mongoURI: "mongodb+srv://nsd2145:<dbuserdbuser>@cluster0.d4gcu5z.mongodb.net/?retryWrites=true&w=majority"
};
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config'); // Import the configuration file

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using the connection string from the configuration file
//mongoose.connect(config.mongoURI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
//});

// Define user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Define routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});