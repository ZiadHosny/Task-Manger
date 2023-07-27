import { useAsyncFn } from 'react-use';
import { useConfig } from './useConfig';

export const useDeleteTask = () => {
    const { backendBaseURL } = useConfig()

    const result = useAsyncFn(async (id: string) => {
        const response = await fetch(`${backendBaseURL}/api/tasks/${id}`,
            {
                method: 'DELETE',
                headers: new Headers({
                    token: JSON.parse(localStorage['user']).token
                })

            }
        );
        const result = await response.json();

        return result;

    }, [backendBaseURL]);

    return result
};
