const express = require('express')
const userSchema = require('../models/userModel')
const mongoose = require('mongoose')


const router = express.Router()


//getAll
router.get('/product', (req, res) => {
    userSchema.aggregate([
        { $unwind: "$posts" },
        { $replaceRoot: { newRoot: "$posts" } },
        { $project: { 'product': 1, '_id': 0 } }
    ])
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(200).json({ message: error }))
})

//getOne
router.get('/product/:idProduct', (req, res) => {
    const { idProduct } = req.params
    userSchema.aggregate([
        { $unwind: "$posts" },
        { $replaceRoot: { newRoot: "$posts" } },
        { $match: { "product._id": mongoose.Types.ObjectId(idProduct) } },
        { $project: { 'product': 1, _id: 0 } }
    ])
        .then((data) => res.status(200).json(data[0]))
        .catch((error) => res.status(400).json({ message: error }))
})

//save
//El producto se guarda al hacer la publicacion
//update
router.put('/product/:idProduct', (req, res) => {
    const { idProduct } = req.params
    const { posts } = userSchema(req.body)
    console.log(posts[0].product);
    userSchema.updateOne(
        { 'posts.product._id': mongoose.Types.ObjectId(idProduct) },
        {
            $set: {
                'posts.$.product.name': posts[0].product.name,
                'posts.$.product.details': posts[0].product.details,
                'posts.$.product.min_age': posts[0].product.min_age,
                'posts.$.product.max_age': posts[0].product.max_age,
                'posts.$.product.pieces': posts[0].product.pieces,
                'posts.$.product.image': posts[0].product.image,
                'posts.$.product.vip_points': posts[0].product.vip_points
            }
        }
    )
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json({ message: error }))
})

//changeStatus
router.patch('/product/:idProduct', (req, res) => {
    const { idProduct } = req.params
    const { posts } = userSchema(req.body)
    console.log(posts[0].product.status);
    userSchema.updateOne(
        { 'posts.product._id': mongoose.Types.ObjectId(idProduct) },
        {
            $set: {
                'posts.$.product.status': posts[0].product.status
            }
        }
    )
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json({ message: error }))
})

module.exports = router