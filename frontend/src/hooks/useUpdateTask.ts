import { useAsyncFn } from 'react-use';
import { useConfig } from './useConfig';
import { Task } from '../utils/types';
import { useRecoilState } from 'recoil';
import { createOrUpdateTaskState, openCreateOrUpdateTaskState } from '../utils/atoms';

export const useUpdateTask = () => {
    const { backendBaseURL } = useConfig()
    const [_, setCreateOrUpdateTask] = useRecoilState(createOrUpdateTaskState)
    const [__, setOpenCreateTask] = useRecoilState(openCreateOrUpdateTaskState)

    const result = useAsyncFn(async ({ taskId, taskName, description, dueDate, isCompleted }: Task) => {
        const response = await fetch(`${backendBaseURL}/api/tasks/${taskId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage['user']).token
                },
                body: JSON.stringify({ taskName, description, dueDate, isCompleted }),
            }
        );
        const result = await response.json();

        if (result.message = 'success') {
            setCreateOrUpdateTask(true)
            setOpenCreateTask({ open: false })
        }

        return result;

    }, [backendBaseURL]);

    return result
};
