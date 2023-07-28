import { atom } from 'recoil';
import { LoggedInUser, Task } from './types';
import { loggedInUser } from './getFromLocalStorge';
import dayjs, { Dayjs } from 'dayjs';

export const openCreateOrUpdateTaskState = atom<{ createOrUpdate?: 'create' | 'update', open: boolean, task?: Task }>({
    key: 'openCreateOrUpdateTask',
    default: { open: false }
});

export const taskDateState = atom<Dayjs>({
    key: 'taskDate',
    default: dayjs(new Date())
});

export const createOrUpdateTaskState = atom<boolean>({
    key: 'createOrUpdateTask',
    default: false
});

export const loggedInUserState = atom<LoggedInUser>({

    key: 'loggedInUser',
    default: loggedInUser
})

export const loadingState = atom<boolean>({
    key: 'loading',
    default: false
});