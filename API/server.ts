import {config} from 'dotenv';
import path from 'path';
config({path: path.resolve('./config/.env'), encoding: 'utf-8'});

import cors from 'cors';
import express from 'express';
import {connectDB} from './DB/db';
import userRoutes from './routes/auth';
import responseHandler from './utils/errorResponse';
import roomsRoute from './routes/rooms';
import customerRoutes from './routes/customers';
import bookingRouter from './routes/bookings';

const app = express();
const port = Number(process.env.PORT) || 8080;
const host = process.env.HOST || 'localhost';

connectDB();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-type'],
    maxAge: 3600
}));

app.use('/user', userRoutes);
app.use('/rooms', roomsRoute);
app.use('/customers', customerRoutes);
app.use('/bookings', bookingRouter);

app.use(responseHandler);

app.listen(port, host, ()=>{
    console.log(`Express server started at http://${host}:${port}`);
})
