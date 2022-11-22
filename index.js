const express = require('express');
const app = express();
const session = require("express-session");
const redis = require("redis");

const mongoose = require('mongoose');
const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL} = require("./config/config");
const port = process.env.PORT || 3000;

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
    host: REDIS_URL,

})


const connectWithRetry = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to database 🍏');
    }).catch((e) => {
        console.log('Connection failed 🍎', 'Retrying in 5 seconds...');
        console.log(e);
        setTimeout(connectWithRetry, 5000);
    });
}

connectWithRetry();

app.use(session, {
    store: new RedisStore({ client: redisClient }),
})
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello! Bro! 🚀');
});

// if someone sends request, and it looks like localhost:3000/posts, then it will be handled by postRouter
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
