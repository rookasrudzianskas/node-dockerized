const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT} = require("./config/config");
const port = process.env.PORT || 3000;

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to database 🍏');
    }).catch((e) => {
        console.log('Connection failed 🍎');
        console.log(e);
        setTimeout(connectWithRetry, 5000);
    });
}

app.get('/', (req, res) => {
    res.send('Hello! Bro! 🚀');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
