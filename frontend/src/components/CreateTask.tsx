import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useRecoilState } from 'recoil';
import { loadingState, openCreateOrUpdateTaskState, taskDateState } from '../utils/atoms';
import { Box, Checkbox, FormControlLabel, IconButton, TextField, Typography } from '@mui/material';
import { DateComponent } from './Date';
import { useCreateTask } from '../hooks/useCreateTask';
import { useUpdateTask } from '../hooks/useUpdateTask';
import dayjs from 'dayjs';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const CreateTask = () => {
    const [taskName, setTaskName] = React.useState<string>('')
    const [description, setDescription] = React.useState<string>('')
    const [tags, setTags] = React.useState<string>('')
    const [isCompleted, setIsCompleted] = React.useState<boolean>(false)
    const [openCreateTask, setOpenCreateTask] = useRecoilState(openCreateOrUpdateTaskState)
    const [dueDate, setDueDate] = useRecoilState(taskDateState)

    const [{ }, createTask] = useCreateTask()
    const [{ }, updateTask] = useUpdateTask()

    const handleClose = () => {
        setOpenCreateTask({ open: false });
        setIsCompleted(false)
        setTaskName('')
        setDescription('')
        setDueDate(dayjs(new Date()))
        setTags('')
    };

    const onClickCreateBtn = async (e: any) => {
        e.preventDefault();
        await createTask({ taskName, description, dueDate: dueDate.toDate(), tags: tags.split(',').filter((e) => e), isCompleted: false })
        setIsCompleted(false)
        setTaskName('')
        setDescription('')
        setDueDate(dayjs(new Date()))
        setTags('')
    }

    const onClickUpdateBtn = async (e: any) => {
        e.preventDefault();
        if (openCreateTask.createOrUpdate == 'update' && openCreateTask.task) {
            await updateTask({
                taskId: openCreateTask.task.taskId,
                taskName,
                description,
                dueDate: dueDate.toDate(),
                isCompleted,
                tags: tags.split(',').filter((e) => e)
            })
        }
        setIsCompleted(false)
        setTaskName('')
        setDescription('')
        setDueDate(dayjs(new Date()))
        setTags('')
    }

    React.useEffect(() => {

        if (openCreateTask.createOrUpdate == 'update' && openCreateTask.task) {
            const { isCompleted, taskName, description, dueDate, tags } = openCreateTask.task
            setIsCompleted(isCompleted)
            setTaskName(taskName)
            setDescription(description)
            setDueDate(dayjs(dueDate))
            setTags(tags.join(','))
        }

    }, [openCreateTask])


    return (
        <Dialog
            open={openCreateTask.open}
            TransitionComponent={Transition}
            keepMounted
            // onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                <Typography>
                    {openCreateTask.createOrUpdate == 'create' ? "Create New Task" : "Update Task"}
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
                        <DateComponent />
                        {openCreateTask.createOrUpdate == 'create' ?
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
                {openCreateTask.createOrUpdate == 'create' ?
                    <Button type='submit' onClick={onClickCreateBtn}>Create</Button> :
                    <Button type='submit' onClick={onClickUpdateBtn}>Update</Button>
                }
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog >
    );
}
