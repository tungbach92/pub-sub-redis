const express = require('express');
const app = express();
const redis = require('redis');
const publish = redis.createClient();
const PORT = 3000;

(async () => {
    await publish.connect();
})()

app.get('/order', async (req, res) => {
    const order = [
        {
            productId: 1,
            price: 5000
        },
        {
            productId: 2,
            price: 10000
        }
    ]

    //Step: payment.js and send mail
    await publish.publish('ordersystem', JSON.stringify(order))

    res.json({
        status: 200,
        message: "Thank you for your order"
    })
})


publish.on('connect', () => console.log('Redis Client Connected'));
publish.on('error', (err) => console.log('Redis Client Connection Error', err));

app.listen(PORT, () => {
    console.log(`The order running at port ${PORT}`)
})