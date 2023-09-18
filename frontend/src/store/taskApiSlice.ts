import { Tasks_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";

const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (data) => ({
                url: `${Tasks_URL}/`,
                method: 'POST',
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${Tasks_URL}/login`,
                method: 'POST',
                body: data
            })
        }),

    })
})

export const {
    useCreateTaskMutation,

} = taskApiSlice