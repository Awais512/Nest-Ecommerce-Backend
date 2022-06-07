import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import errorHandler from './middlewares/error.js';
import cookieParser from 'cookie-parser';
dotenv.config({ path: 'backend/config/.env' });

//Import Route Files
import productRoute from './routes/productRoutes.js';
import userRoute from './routes/userRoutes.js';
import orderRoute from './routes/orderRoutes.js';

const app = express();
const PORT = process.env.PORT;

//Connecting to Mongodb
connectDb();

//App Middlewares
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}
app.use(cors());

//Route Middlewares
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is Running on Port: ${PORT}`));
