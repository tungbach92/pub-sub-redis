const express = require('express');
const app = express();
const redis = require('redis');
const subscribe = redis.createClient();
const PORT = 3002;


(async () => {
    await subscribe.connect();

    //subscribe channel
    await subscribe.subscribe('ordersystem', (message, channel) => {
        console.log(`The channel for sendmail is`, channel)
        console.log(`The message for sendmail is`, JSON.parse(message))
    });

    //psubscribe channel
    await subscribe.pSubscribe('o*', (message, channel, pattern) => {
        console.log(`The channel for sendmail is`, channel)
        console.log(`The message for sendmail is`, JSON.parse(message))
    })
})();

subscribe.on('connect', () => console.log('Redis Client Connected'));
subscribe.on('error', (err) => console.log('Redis Client Connection Error', err));

app.listen(PORT, () => {
    console.log(`The sendmail running at port ${PORT}`)
})