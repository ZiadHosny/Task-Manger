export type Comment = {
    commentName: string
    commentDate: Date
}

export type Task = {
    taskId: string,
    taskName: string,
    description: string,
    dueDate: Date,
    isCompleted: boolean,
    tags: string[],
    comments?: Comment[],
}

export type CreateTaskData = {
    taskName: string,
    description: string | undefined,
    dueDate: Date | undefined,
    isCompleted?: boolean,
    tags: string[]
}
