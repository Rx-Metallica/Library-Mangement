import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import StudentRoutes from './routes/StudentRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import reportRoutes from './routes/reportRoutes.js';


// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()

// Middlewares
app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send('API working')
})

// Api endpoints
app.use('/api/books',bookRoutes)
app.use('/api/students',StudentRoutes)
app.use('/api/transactions',transactionRoutes)
app.use('/api/dashboard',dashboardRoutes)
app.use('/api/reports',reportRoutes)

// Listen

app.listen(port,()=>console.log(`Server is running on port ${port}`))