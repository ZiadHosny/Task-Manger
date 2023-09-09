import express from 'express';
import cors from 'cors';
import { getFromEnv } from './utils/getFromEnv.js';
import dotenv from 'dotenv';
import taskRouter from './modules/task/task.router.js';
import { connectToMongoDb } from './databases/connectToMongo.js';
import userRouter from './modules/user/user.router.js';
import { globalErrorMiddleware } from './middleware/globalError.middleware.js';
import cookieParser from 'cookie-parser';
// Load .env
dotenv.config();
const { port } = getFromEnv();
// Connect To Mongo
connectToMongoDb();
const app = express();
// Express Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// EndPoints
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
// ERROR
app.use(globalErrorMiddleware);
// Start The Server
app.listen(port, () => console.log(`Task Manager App listening on port ${port}!`));
