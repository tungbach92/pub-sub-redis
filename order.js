const express = require('express');
const {pub} = require("./connections/init.redis");
const app = express();
const PORT = 3000;

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
    pub.publish('o1212', JSON.stringify(order))

    res.json({
        status: 200,
        message: "Thank you for your order"
    })
})


pub.on('connect', () => console.log('Redis Client Connected'));
pub.on('error', (err) => console.log('Redis Client Connection Error', err));

app.listen(PORT, () => {
    console.log(`The order running at port ${PORT}`)
})