import { NextFunction, Request, Response } from "express";
import { TaskModel } from "../../databases/models/task.model.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";

// GET All Tasks "/"
export const getAllTasks = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId
    const sort = req.query.sort?.toString()
    let page = Number(req.query.page) > 1 ? Number(req.query.page) : 1
    const limit = 5
    const skip = (page - 1) * limit
    const count = await TaskModel.count({ createdBy: userId })
    const tasks = await TaskModel.find({ createdBy: userId }).limit(limit).skip(skip).sort(sort)
    res.status(200).json({ count, tasks });
})

// POST a Task
export const createTask = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const { taskId, taskName, description, dueDate, isCompleted, tags } = req.body

    const task = await TaskModel.create({ taskId, taskName, description, dueDate, isCompleted, tags, createdBy: req.userId })

    res.status(201).json({ message: "success", data: task });
})

// PUT Task
export const updateTask = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
        return next(new AppError(`cannot find any Task with ID ${id}`, 404))
    }

    res.status(201).json({ message: "success", updatedTask });

})

//
export const updateTaskCompleted = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { isCompleted } = req.body
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { $set: { isCompleted } }, { new: true });

    if (!updatedTask) {
        return next(new AppError(`cannot find any Task with ID ${id}`, 404))
    }

    res.status(201).json({ message: "success", updatedTask });

})

// DELETE Task
export const deleteTask = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
        return next(new AppError(`cannot find any task with ID ${id}`, 404))
    }
    res.status(200).json({ message: "success" });
})

// GET Task ById
// DELETE Task
export const getTask = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (!task) {
        return next(new AppError(`cannot find any task with ID ${id}`, 404))
    }
    res.status(200).json({ message: "success" });
})