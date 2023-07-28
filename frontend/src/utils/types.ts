export type Task = {
    taskId: string,
    taskName: string,
    description: string,
    dueDate: Date,
    isCompleted: boolean,
    tags: string[]
}

export type CreateTaskData = {
    taskName: string,
    description: string | undefined,
    dueDate: Date | undefined,
    isCompleted?: boolean,
    tags: string[]
}

export type LoggedInUser = {
    name: string,
    token: string,
}
