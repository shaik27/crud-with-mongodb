const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    pid: {
        type: Number,
        required: [true, 'PID is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number
    }
})

const Product = mongoose.model("Product", userSchema)

module.exports = Product