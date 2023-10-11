const Redis = require('ioredis')
const pub = new Redis()
const sub = new Redis()
const psub = new Redis()
module.exports = {pub, sub, psub}