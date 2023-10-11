const express = require('express');
const {sub, psub} = require("./connections/init.redis");
const app = express();
const PORT = 3002;


//subscribe channel
sub.subscribe('ordersystem');
sub.on('message', (channel, message) => {
    console.log(`The channel for sendmail is`, channel)
    console.log(`The message for sendmail is`, JSON.parse(message))
})

sub.on('connect', () => console.log('Redis Sub Client Connected'));
sub.on('error', (err) => console.log('Redis Sub Client Connection Error', err));

//psubscribe channel
psub.psubscribe('o*')

psub.on('pmessage',  (pattern, channel, message) => {
    console.log(`The pattern is`, pattern)
    console.log(`The channel for sendmail is`, channel)
    console.log(`The message for sendmail is`, JSON.parse(message))
})

psub.on('connect', () => console.log('Redis psub Client Connected'));
psub.on('error', (err) => console.log('Redis psub Client Connection Error', err));

app.listen(PORT, () => {
    console.log(`The sendmail running at port ${PORT}`)
})