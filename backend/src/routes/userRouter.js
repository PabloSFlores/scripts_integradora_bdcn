const express = require('express')
const userSchema = require('../models/userModel')
const mongoose = require('mongoose')


const router = express.Router()

// create user
router.post('/user', (req, res) => {
    const user = userSchema(req.body)
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

// get all users
router.get('/user', (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

// get one user
router.get('/user/:id', (req, res) => {
    const { id } = req.params
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//update user
router.put('/user/:id', (req, res) => {
    const { id } = req.params
    const { name, surname, lastname, age, email, password } = userSchema(req.body)
    userSchema
        .updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: { name, surname, lastname, age, email, password } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

//delete user
router.patch('/user/:id', (req, res) => {
    const { id } = req.params
    const { status } = userSchema(req.body)
    userSchema
        .updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: {'status': status} })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})

module.exports = router