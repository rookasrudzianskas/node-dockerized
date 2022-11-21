const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://rokas:rokas@192.168.32.2:27017/?authSource=admin').then(() => {
    console.log('Connected to database :gr');
})

app.get('/', (req, res) => {
    res.send('Hello! Bro! 🚀');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
