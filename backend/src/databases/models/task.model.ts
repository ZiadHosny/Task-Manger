import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        taskId: {
            type: mongoose.Types.ObjectId,
            auto: true
        },
        taskName: {
            type: String,
            required: [true, "Please enter a task name"]
        },
        description: {
            type: String,
        },
        dueDate: {
            type: Date,
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        tags: [{ type: String, default: [] }],
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(_doc, ret) {
                ret.taskId = ret._id
                delete ret._id
            }
        }
    }
)


export const TaskModel = mongoose.model('Task', taskSchema);

