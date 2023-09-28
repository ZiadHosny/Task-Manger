import express from 'express';
import cors from 'cors';
import { getFromEnv } from './utils/getFromEnv.js';
import dotenv from 'dotenv';
import taskRouter from './modules/task/task.router.js';
import { connectToMongoDb } from './databases/connectToMongo.js';
import userRouter from './modules/user/user.router.js';
import { globalErrorMiddleware } from './middleware/globalError.middleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';
// Load .env
dotenv.config();
const { port } = getFromEnv();
// Connect To Mongo
connectToMongoDb();
const app = express();
// Express Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// EndPoints
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}
// ERROR
app.use(globalErrorMiddleware);
// Start The Server
app.listen(port, () => console.log(`Task Manager App listening on port ${port}!`));
