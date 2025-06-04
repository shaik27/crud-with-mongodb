const mongoose = require('mongoose')

const connectDb = async () => {
    await mongoose.connect('mongodb+srv://shaikmeharaj35:2fIMljtkOpLlhSya@meharajcluster.a6siv.mongodb.net/products')
}

module.exports = connectDb
