import { Tasks_URL } from "../utils/constants";
import { Comment, Task } from "../utils/types";
import { apiSlice } from "./apiSlice";

const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query({
            query: ({ page, sort }: { page: number, sort: string }) => ({
                url: `${Tasks_URL}?page=${page}&sort=${sort}`,
                method: 'GET',
            }),
        }),
        createTask: builder.mutation({
            query: (data) => ({
                url: `${Tasks_URL}/`,
                method: 'POST',
                body: data,
            }),
        }),
        updateTask: builder.mutation({
            query: (data: Task) => ({
                url: `${Tasks_URL}/${data.taskId}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteTask: builder.mutation({
            query: (id: string) => ({
                url: `${Tasks_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
        changeCompleteTask: builder.mutation({
            query: ({ id, isCompleted }: { id: string, isCompleted: boolean }) => ({
                url: `${Tasks_URL}/${id}`,
                method: 'PATCH',
                body: { isCompleted }
            }),
        }),
        addComment: builder.mutation({
            query: ({ id, comments }: { id: string, comments: Comment[] }) => ({
                url: `${Tasks_URL}/${id}/comment`,
                method: 'PATCH',
                body: { comments }
            }),
        }),
    })
})

export const {
    useGetAllTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useChangeCompleteTaskMutation,
    useAddCommentMutation
} = taskApiSlice