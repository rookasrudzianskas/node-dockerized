const express = require('express');
const app = express();
const session = require("express-session");
const redis = require("redis");
const mongoose = require('mongoose');
const cors = require('cors');

// MONGO setup
const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT} = require("./config/config");
const port = process.env.PORT || 3000;

// Routes setup
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const {createClient} = require("redis");

// Clients initialization setup
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        port: REDIS_PORT,
        host: REDIS_URL
    }
});

redisClient.connect().catch(console.error);

// Connection to mongoDB
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

// Middlewares setup
app.enable("trust proxy");
app.use(cors({}));
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        saveUninitialized: true,
        httpOnly: true,
        maxAge: 3000,
        resave: false,
    })
);
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

app.get('/api/v1', (req, res) => {
    res.send('Hello! Bro!! 🚀');
    console.log("yeah it ran 🍏");
});

// if someone sends request, and it looks like localhost:3000/posts, then it will be handled by postRouter
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
