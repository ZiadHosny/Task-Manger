import { useAsyncFn } from 'react-use';
import { useConfig } from './useConfig';
import { useRecoilState } from 'recoil';
import { createOrUpdateTaskState } from '../utils/atoms';
import { Comment } from '../utils/types';

export const useAddComment = () => {
    const { backendBaseURL } = useConfig()
    const [_, setCreateOrUpdateTask] = useRecoilState(createOrUpdateTaskState)

    const result = useAsyncFn(async ({ taskId, comments }: { taskId: string, comments: Comment[] }) => {
        const response = await fetch(`${backendBaseURL}/api/tasks/${taskId}/comment`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage['user']).token
                },
                body: JSON.stringify({ comments }),
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
