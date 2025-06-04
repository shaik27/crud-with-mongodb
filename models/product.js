const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    pid: {
        type: Number,
    },
    name: {
        type: String
    },
    price: {
        type: Number
    }
})

const Product = mongoose.model("Product", userSchema)

module.exports = Product