import { useAsyncFn } from 'react-use';
import { useConfig } from './useConfig';
import { CreateTaskData } from '../utils/types';
import { useRecoilState } from 'recoil';
import { createOrUpdateTaskState, openCreateOrUpdateTaskState } from '../utils/atoms';

export const useCreateTask = () => {
    const { backendBaseURL } = useConfig()
    const [_, setCreateOrUpdateTask] = useRecoilState(createOrUpdateTaskState)
    const [__, setOpenCreateTask] = useRecoilState(openCreateOrUpdateTaskState)

    const result = useAsyncFn(async (task: CreateTaskData) => {
        const response = await fetch(`${backendBaseURL}/api/tasks`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage['user']).token
                },
                body: JSON.stringify(task),
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
