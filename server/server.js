require('dotenv').config()
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB = require('./database/db')

const app = express()
const port = process.env.PORT || 3000

//DB Connection
connectDB();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cache-Control', 'Expires', 'Pragma']
}))
app.use(cookieParser())

// Routes
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const productRoutes = require('./routes/product')
app.use('/api/products', productRoutes)

const cartRoutes = require('./routes/cart-routes')
app.use('/api/cart', cartRoutes)


const imageRoutes = require('./routes/image-routes')
app.use('/api/images', imageRoutes)

const addressRoutes = require('./routes/address-routes')
app.use('/api/addresses', addressRoutes)

const orderRoutes = require('./routes/order-routes')
app.use('/api/orders', orderRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})