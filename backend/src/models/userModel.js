const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: false
    },
    details:{
        type: String,
        required: false
    },
    min_age:{
        type: Number,
        required: false
    },
    max_age:{
        type: Number,
        required: false
    },
    pieces:{
        type: Number,
        required: false
    },
    vip_points:{
        type: Number,
        required: false
    },
    image:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: false
    }
})

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false
    },
    rating:{
        type: Number,
        required: false
    },
    price:{
        type: Number,
        required: false
    },
    condition:{
        type: Number,
        required: false
    },
    status:{
        type: Boolean,
        required: false
    },
    product:{
        type: productSchema
    }
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    },
    posts:[postSchema]
})

module.exports = mongoose.model('User', userSchema)