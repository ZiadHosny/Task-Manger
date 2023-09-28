import { useState, forwardRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Checkbox, FormControlLabel, IconButton, TextField, Typography } from '@mui/material';
import { DateComponent } from './Date';
import dayjs from 'dayjs';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../store/taskApiSlice';
import { setLoading } from '../store/loadingSlice';
import { toast } from 'react-toastify';
import { setModal } from '../store/modalSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const CreateTask = ({ refetch }: { refetch: VoidFunction }) => {
    const modal = useAppSelector(state => state.modal)

    const dispatch = useAppDispatch()

    const [createTaskFn, { isLoading: createLoading }] = useCreateTaskMutation()
    const [updateTaskFn, { isLoading: updateIsLoading }] = useUpdateTaskMutation()

    const [taskName, setTaskName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [tags, setTags] = useState<string>('')
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    const [dueDate, setDueDate] = useState(dayjs(new Date()))

    const handleClose = () => {
        dispatch(setModal({ open: false }))
        resetFrom()
    };

    const resetFrom = () => {
        dispatch(setModal({ open: false }))
        setIsCompleted(false)
        setTaskName('')
        setDescription('')
        setDueDate(dayjs(new Date()))
        setTags('')
    }

    const onClickCreateBtn = async (e: any) => {
        e.preventDefault();
        try {
            await createTaskFn({
                taskName,
                description,
                dueDate: dueDate.toDate(),
                tags: tags.split(',').filter((e) => e),
                isCompleted: false
            }).unwrap()

            refetch()
        } catch (err: any) {
            toast.error(err?.data?.error || err?.error);
        }

        resetFrom()
    }

    const onClickUpdateBtn = async (e: any) => {
        e.preventDefault();

        try {
            await updateTaskFn({
                taskId: modal.task?.taskId || '',
                taskName,
                description,
                dueDate: dueDate.toDate(),
                isCompleted,
                tags: tags.split(',').filter((e) => e)
            }).unwrap()

            refetch()
        } catch (err: any) {
            toast.error(err?.data?.error || err?.error);
        }
        resetFrom()
    }

    useEffect(() => {

        if (modal.createOrUpdate === 'update' && modal.task) {
            const { isCompleted, taskName, description, dueDate, tags } = modal.task
            setIsCompleted(isCompleted)
            setTaskName(taskName)
            setDescription(description)
            setDueDate(dayjs(dueDate))
            setTags(tags.join(','))
        }

    }, [modal])

    useEffect(() => {
        dispatch(setLoading(createLoading))
    }, [dispatch, createLoading])

    useEffect(() => {
        dispatch(setLoading(updateIsLoading))
    }, [dispatch, updateIsLoading])

    return (
        <Dialog
            open={modal.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                <Typography>
                    {modal.createOrUpdate === 'create' ? "Create New Task" : "Update Task"}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box >
                    <TextField
                        fullWidth
                        type="text"
                        label="Enter Task Name"
                        variant="outlined"
                        style={{ margin: '20px 0' }}
                        required
                        value={taskName}
                        onChange={(e) => { setTaskName(e.target.value) }}
                    />
                    <TextField
                        fullWidth
                        type="text"
                        label="Enter Task Description"
                        variant="outlined"
                        style={{ marginBottom: 20 }}
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                    <TextField
                        fullWidth
                        type="text"
                        label="Enter Tags Separated with commas"
                        variant="outlined"
                        style={{ marginBottom: 20 }}
                        value={tags}
                        onChange={(e) => { setTags(e.target.value) }}
                    />
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <DateComponent date={dueDate} setDate={setDueDate} />
                        {modal.createOrUpdate === 'create' ?
                            <></>
                            :
                            <FormControlLabel label="Completed"
                                control={
                                    <Checkbox color="success"
                                        checked={isCompleted}
                                        onChange={(_, checked) => { setIsCompleted(checked) }}
                                    />}
                            />
                        }

                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                {modal.createOrUpdate === 'create' ?
                    <Button type='submit' onClick={onClickCreateBtn}>Create</Button> :
                    <Button type='submit' onClick={onClickUpdateBtn}>Update</Button>
                }
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog >
    );
}
