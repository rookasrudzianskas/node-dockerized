const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://rokas:rokas@');

app.get('/', (req, res) => {
    res.send('Hello! Bro! 🚀');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
