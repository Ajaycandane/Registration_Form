const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://ajay:database@cluster0.7qdxvif.mongodb.net/new1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../public')));

// Handle the default route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});





// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const User = require('./models/User.js');

// Parse JSON bodies
app.use(express.json());

// Registration endpoint
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email })
  .then((existingUser) => {
    if (existingUser) {
      // User already exists
      res.status(409).json({ error: 'User already exists' });
    } else {
      // Create a new user
      const newUser = new User({
        name,
        email,
        password,
      });

      newUser.save()
        .then(() => {
          res.status(200).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Failed to register user' });
        });
    }
  })
  .catch((error) => {
    res.status(500).json({ error: 'Failed to register user' });
  });
});
