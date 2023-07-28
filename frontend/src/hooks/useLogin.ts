import { useAsyncFn } from 'react-use';
import { useConfig } from './useConfig';
import { useNavigate } from 'react-router-dom';
import { loggedInUserState } from '../utils/atoms';
import { useRecoilState } from 'recoil';

export const useLogin = () => {
    const { backendBaseURL } = useConfig()
    const navigate = useNavigate()
    const [_, setLoggedInUser] = useRecoilState(loggedInUserState)

    const result = useAsyncFn(async ({ email, password }: { email: string, password: string }) => {
        const response = await fetch(`${backendBaseURL}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }
        );
        const result = await response.json();

        if (result.error) {
            throw new Error(result.error)
        }

        if (result.message = 'success') {
            const user = { name: result.name, token: result.token }
            localStorage['user'] = JSON.stringify(user)
            setLoggedInUser(user)
            navigate('/tasks')
        }

        return result;

    }, [backendBaseURL]);

    return result
};
