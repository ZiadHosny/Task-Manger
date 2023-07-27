import { useAsyncFn } from 'react-use';
import { useConfig } from './useConfig';
import { useRecoilState } from 'recoil';
import { createOrUpdateTaskState } from '../utils/atoms';

export const useCompleteTask = () => {
    const { backendBaseURL } = useConfig()
    const [_, setCreateOrUpdateTask] = useRecoilState(createOrUpdateTaskState)

    const result = useAsyncFn(async ({ taskId, isCompleted }: { taskId: string, isCompleted: boolean }) => {
        const response = await fetch(`${backendBaseURL}/api/tasks/${taskId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage['user']).token
                },
                body: JSON.stringify({ isCompleted }),
            }
        );
        const result = await response.json();

        if (result.message = 'success') {
            setCreateOrUpdateTask(true)
        }

        return result;

    }, [backendBaseURL]);

    return result
};
