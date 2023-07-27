import express from 'express'
import * as Task from './task.controller.js'
import { userAuth } from '../../middlewares/auth.middleware.js'

const taskRouter = express.Router()

taskRouter.route('/')
    .get(userAuth, Task.getAllTasks)
    .post(userAuth, Task.createTask)

taskRouter
    .route('/:id')
    .get(userAuth, Task.getTask)
    .put(userAuth, Task.updateTask)
    .delete(userAuth, Task.deleteTask)

export default taskRouter