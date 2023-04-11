const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.set('strictQuery', false)
require('dotenv').config()
const userRoutes = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const productRouter = require('./routes/productRouter')

const app = express()
const port = process.env.PORT || 9000

// middleware
app.use(express.json())
app.use(cors(
    {origin: '*'}
))
app.use('/api-lego', userRoutes)
app.use('/api-lego', postRouter)
app.use('/api-lego', productRouter)


//routes
app.get('/',(req,res) => {
    res.send('Welcome to my mongodb api')
})

//MongoDb conection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDb atlas'))
.catch((error) => console.error(error))

app.listen(port,() => console.log('Server listening on port', port))