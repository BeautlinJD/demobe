const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
const cors = require('cors');
const ObjectId = mongoose.Types.ObjectId;

app.use(cors());

mongoose.connect('mongodb+srv://beautlin2001jd:kmPEQgTsJeTdzW9S@cluster0.t3jrypi.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Successfully connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });



  const User = mongoose.model('users', {
    PhoneNumber:String,
    Password:String,
    ConfirmPassword:String
  });


app.use(bodyParser.json());


  // Create a new user
app.post('/users', async (req, res) => {
    try {
      console.log(req.body)
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  

//Get all users

app.get('/listofusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});









  //kmPEQgTsJeTdzW9S

