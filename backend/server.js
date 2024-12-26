import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import 'dotenv/config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 4000; // Use the PORT from the environment or default to 4000

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static(path.join(__dirname, 'uploads'))); // Ensure path compatibility
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('API Works');
});

// App listens on IP 0.0.0.0 and port from environment variable
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});