const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');

const Item = require('./Item');

const app = express();
app.use(cors);
const port = 4000;
app.use(bodyParser.json());
app.listen(port, () => {
    console.log("Server is running at port 4000");
});

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://beautlinb:SjRMysL4HLyCLV9Q@cluster0.yfd0uxt.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/additems', (req, res) => {
  console.log("success")
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  console.log(newItem)

  newItem.save().then(() => {
    res.send("success");
  }).catch(e => {
    console.log(e)
    res.send("error");
  });
});

    
 
  app.get("/listofitems",(req,res)=>{
    Item.find()
    .then(listofitems=>res.json(listofitems))
    .catch(err=>console.log(err));
  });

