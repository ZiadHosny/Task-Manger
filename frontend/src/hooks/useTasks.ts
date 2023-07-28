import { useAsyncFn } from "react-use"
import { Task } from "../utils/types"
import { useConfig } from "./useConfig"

export const useTasks = () => {
    const { backendBaseURL } = useConfig()

    const result = useAsyncFn(async ({ page = 1, sort = '' }: { page?: number, sort?: string }): Promise<{ tasks: Task[], count: number }> => {
        const response = await fetch(`${backendBaseURL}/api/tasks?page=${page}&sort=${sort}`,
            {
                headers: new Headers({
                    token: JSON.parse(localStorage['user']).token
                })

            })
        const result = await response.json();

        if (result.error) {
            return { tasks: [], count: 0 }
        } else {
            const tasks = result as { tasks: Task[], count: number }

            return tasks
        }
    }, [backendBaseURL])

    return result
}