const express = require('express');
const app = express();
const redis = require('redis');
const subscribe = redis.createClient();
const PORT = 3001;

//subscribe channel
(async () => {
    await subscribe.connect();
    await subscribe.subscribe('ordersystem', (message, channel) => {
        console.log(`The channel for payment is`, channel)
        console.log(`The message for payment is`, JSON.parse(message))
    });
})();

subscribe.on('connect', () => console.log('Redis Client Connected'));
subscribe.on('error', (err) => console.log('Redis Client Connection Error', err));

app.listen(PORT, () => {
    console.log(`The payment running at port ${PORT}`)
})