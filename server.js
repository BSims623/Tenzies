import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import 'express-async-errors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';

const app = express()

// routers
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import leaderBoardRouter from './routes/leaderBoardRouter.js'

// public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// middleware

import { authenticateUser } from './middleware/authMiddleware.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.static(path.resolve(__dirname, './client/dist')))

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/leaderboard', leaderBoardRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', './index.html'))
})

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' })
})


app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}...`);
    })
} catch (error) {
    console.log(error);
    process.exit(1);
}
