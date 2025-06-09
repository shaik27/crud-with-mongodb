const express = require('express')
let app = express()
const Product = require('./models/product')
const connectDb = require('./congif/database')

const logger = (req, res, next) => {
    // console.log('logger');
    next()
}
//middleware
app.use(express.json())
app.use(logger)

//custom middleware


//get
app.get('/api/v1/products', async (req, res) => {
    try {
        const product = await Product.find()
        res.send(product)
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

//get by id
app.get('/api/v1/products/:idVal', async (req, res) => {
    try {
        let id = req.params.idVal
        console.log(id)
        // const product = await Product.findById(id) //to fetch basis on id
        // const product = await Product.findOne({name:id}) //to fetch basis on particular field name
        const product = await Product.findOne({ pid: id }) //to fetch basis on particular field pid
        if (product) {
            res.status(200).json({
                product
            })
        }
        else {
            res.status(400).json({
                message: 'No Data Found: Please enter valid id'
            })
        }
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

//post
app.post('/api/v1/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        })
    } catch (error) {
        const errorMsg = Object.values(error?.errors).map(el => el?.message);
        res.status(400).json({
            status: 'failed',
            message: error.message,
            errorMsg
        })
    }
})

//Put
app.put('/api/v1/products/:updateId', async (req, res) => {
    try {
        const id = req.params.updateId
        const updateProduct = await Product.updateOne({ pid: id }, req.body, { new: true, runValidators: true })
        if (updateProduct.modifiedCount !== 0) {
            res.status(200).json({
                status: 'updated successfully',
                data: {
                    updateProduct
                }
            })
        }
        else {
            res.status(400).json({
                message: 'please provide correct id'
            })
        }

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
})

//delete
app.delete('/api/v1/products/:deleteId', async (req, res) => {
    try {
        const id = req.params.deleteId
        const deletedProduct = await Product.deleteOne({ pid: id })
        if (deletedProduct.deletedCount !== 0) {
            res.status(200).json({
                status: 'deleted successfully',
                data: {
                    deletedProduct
                }
            })
        }
        else {
            res.status(400).json({
                message: 'id not found'
            })
        }
    } catch (error) {
        res.status(400).json({
            status: 'failed to delete',
            message: error.message
        })
    }
})

const PORT = 3002

// app.listen(PORT, () => {
//     console.log('server has started on port ', PORT);
// })

connectDb().then(() => {
    console.log('connected to db successfully');
    app.listen(PORT, () => {
        console.log('server is successfully listening to port ' + PORT);
    })
})
    .catch(() => {
        console.log('failed to connect to db');
    })