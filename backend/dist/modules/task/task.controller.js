import { TaskModel } from "../../databases/models/task.model.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
import { AppError } from "../../utils/AppError.js";
// GET All Tasks "/"
export const getAllTasks = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;
    const sort = req.query.sort?.toString();
    let page = Number(req.query.page) > 1 ? Number(req.query.page) : 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const count = await TaskModel.count({ createdBy: userId });
    const tasks = await TaskModel.find({ createdBy: userId }).limit(limit).skip(skip).sort(sort);
    res.status(200).json({ count, tasks });
});
// POST a Task
export const createTask = catchAsyncError(async (req, res, next) => {
    const { taskName, description, dueDate, isCompleted, tags } = req.body;
    const task = await TaskModel.create({ taskName, description, dueDate, isCompleted, tags, createdBy: req.user._id });
    res.status(201).json({ message: "success", data: task });
});
// PUT Task
export const updateTask = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) {
        return next(new AppError(`cannot find any Task with ID ${id}`, 404));
    }
    res.status(201).json({ message: "success", updatedTask });
});
// Update Task completion
export const updateTaskCompleted = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { isCompleted } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { $set: { isCompleted } }, { new: true });
    if (!updatedTask) {
        return next(new AppError(`cannot find any Task with ID ${id}`, 404));
    }
    res.status(201).json({ message: "success", updatedTask });
});
// Add Comment
export const AddComment = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { comments } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { $set: { comments } }, { new: true });
    if (!updatedTask) {
        return next(new AppError(`cannot find any Task with ID ${id}`, 404));
    }
    res.status(201).json({ message: "success", updatedTask });
});
// DELETE Task
export const deleteTask = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
        return next(new AppError(`cannot find any task with ID ${id}`, 404));
    }
    res.status(200).json({ message: "success" });
});
// GET Task ById
export const getTask = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (!task) {
        return next(new AppError(`cannot find any task with ID ${id}`, 404));
    }
    res.status(200).json({ message: "success" });
});
