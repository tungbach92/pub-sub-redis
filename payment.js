const express = require('express');
const {sub} = require("./connections/init.redis");
const app = express();
const PORT = 3001;

//subscribe channel
sub.subscribe('ordersystem');

sub.on('message', (channel, message) => {
    console.log(`The channel for payment is`, channel)
    console.log(`The message for payment is`, JSON.parse(message))
})
sub.on('connect', () => console.log('Redis Client Connected'));
sub.on('error', (err) => console.log('Redis Client Connection Error', err));

app.listen(PORT, () => {
    console.log(`The payment running at port ${PORT}`)
})