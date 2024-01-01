const mongoose = require('mongoose')
require('dotenv').config()


const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {useNewUrlParser: true})
.then(() => {
    console.log('database connected successfully')
})
.catch((err) => {
    console.log(`error occured while connecting${err}`)
})
