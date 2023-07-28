import { useAsyncFn } from 'react-use';
import { useConfig } from './useConfig';
import { useNavigate } from 'react-router-dom';

export const useSignUp = () => {
    const { backendBaseURL } = useConfig()
    const navigate = useNavigate()

    const result = useAsyncFn(async ({ firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
        const response = await fetch(`${backendBaseURL}/api/auth/signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            }
        );
        const result = await response.json();

        if (result.error) {
            throw new Error(result.error)
        }

        if (result.message == 'success') {
            navigate('/login')
        }

        return result;

    }, [backendBaseURL]);

    return result
};
