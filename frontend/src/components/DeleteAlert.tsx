import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../store/hooks';
import { Task } from '../utils/types';
import { useDeleteTaskMutation } from '../store/taskApiSlice';
import { useEffect } from 'react';
import { setLoading } from '../store/loadingSlice';
import { deleteMsg, errorMsg, loadingMsg } from '../utils/messages';

type DeleteAlertType = {
    open: boolean,
    selectedTask: Task | null,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refetchTasks: VoidFunction
}

export const DeleteAlert = ({ open, setOpen, selectedTask, refetchTasks }: DeleteAlertType) => {
    const dispatch = useAppDispatch();
    const [deleteTaskFn, { isLoading: deleteIsLoading, }] = useDeleteTaskMutation()

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        toast.promise(async () => {
            if (selectedTask) {
                await deleteTaskFn(selectedTask?.taskId).unwrap()
                refetchTasks()
            }
        }, {
            pending: loadingMsg,
            success: deleteMsg,
            error: {
                render({ toastProps }) {
                    const res = toastProps.data as any
                    const error = res.data.error ?? errorMsg
                    return error
                },
            },
        })
        handleClose()
    }

    useEffect(() => {
        dispatch(setLoading(deleteIsLoading))
    }, [dispatch, deleteIsLoading])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are You Sure to Delete this Task?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Delete task with title : {selectedTask?.taskName}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}