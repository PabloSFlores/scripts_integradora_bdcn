const express = require('express')
const userSchema = require('../models/userModel')
const mongoose = require('mongoose')


const router = express.Router()

//insert posts
//Inserta un post obteniendo el id del usuario como parametro en la url
router.post('/post/:idUser', (req, res) => {
    const { idUser } = req.params
    const { posts } = userSchema(req.body)
    userSchema.updateOne(
        { _id: mongoose.Types.ObjectId(idUser) },
        { $push: { posts } }
    )
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json({ message: error }))
})

//getAll
//Obtiene el listado general de post de todos los documentos
router.get('/post', (req, res) => {
    userSchema.aggregate([
        { $unwind: "$posts" },
        { $replaceRoot: { newRoot: "$posts" } }
    ])
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(200).json({ message: error }))
})

//getOne
//Obtiene un post por id
router.get('/post/:idPost', (req, res) => {
    const { idPost } = req.params
    userSchema.aggregate([
        { $unwind: "$posts" },
        { $replaceRoot: { newRoot: "$posts" } },
        { $match: { "_id": mongoose.Types.ObjectId(idPost) } }
    ])
        .then((data) => res.status(200).json(data[0]))
        .catch((error) => res.status(400).json({ message: error }))
})

//update
//Actuliza un post por id, solo la informacion del post, no del product
router.put('/post/:idPost', (req, res) => {
    const { idPost } = req.params
    const { posts } = userSchema(req.body)
    console.log(posts[0].product);
    userSchema.updateOne(
        { 'posts._id': mongoose.Types.ObjectId(idPost) },
        {
            $set: {
                'posts.$.title': posts[0].title,
                'posts.$.description': posts[0].description,
                'posts.$.rating': posts[0].rating,
                'posts.$.price': posts[0].price,
                'posts.$.condition': posts[0].condition
            }
        }
    )
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json({ message: error }))
})


//changeStatus
//cambia el estado del post
router.patch('/post/:idPost', (req, res) => {
    const { idPost } = req.params
    const { posts } = userSchema(req.body)
    console.log(posts[0].status);
    userSchema.updateOne(
        { 'posts._id': mongoose.Types.ObjectId(idPost) },
        {
            $set: {
                'posts.$.status': posts[0].status
            }
        }
    )
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json({ message: error }))
})

module.exports = router