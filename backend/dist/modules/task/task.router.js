import express from 'express';
import * as Task from './task.controller.js';
import { userAuth } from '../../middleware/auth.middleware.js';
const taskRouter = express.Router();
taskRouter.route('/')
    .get(userAuth, Task.getAllTasks)
    .post(userAuth, Task.createTask);
taskRouter
    .route('/:id')
    .get(userAuth, Task.getTask)
    .put(userAuth, Task.updateTask)
    .patch(userAuth, Task.updateTaskCompleted)
    .delete(userAuth, Task.deleteTask);
taskRouter.route('/:id/comment').patch(userAuth, Task.AddComment);
export default taskRouter;
