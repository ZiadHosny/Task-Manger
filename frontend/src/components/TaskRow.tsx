import { useEffect, useState } from 'react'
import {
    Box, Button,
    Checkbox, Chip,
    Collapse, IconButton,
    InputAdornment, TextField,
    Typography, TableHead,
    TableRow, TableBody,
    Table, TableCell,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import { Task } from "../utils/types";
import { useAppDispatch } from '../store/hooks';
import { setModal } from '../store/modalSlice';
import { useAddCommentMutation, useChangeCompleteTaskMutation } from '../store/taskApiSlice';
import { setLoading } from '../store/loadingSlice';
import { toast } from 'react-toastify';
import { DeleteAlert } from './DeleteAlert';
import { errorMsg, loadingMsg, updateMsg } from '../utils/messages';

export const TaskRow = ({ task, refetchTasks }: { task: Task, refetchTasks: VoidFunction }) => {
    const [currentComment, setCurrentComment] = useState('');
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch()

    const [changeCompleteTaskFn, { isLoading: changeCompleteTaskIsLoading }] = useChangeCompleteTaskMutation()
    const [addCommentFn, { isLoading: addCommentIsLoading }] = useAddCommentMutation()

    const openUpdateModal = (task: Task) => {
        dispatch(setModal({ createOrUpdate: 'update', open: true, task }))
    }

    const checkCompleteTask = async () => {
        toast.promise(async () => {
            await changeCompleteTaskFn({ id: task.taskId, isCompleted: !task.isCompleted }).unwrap()
            refetchTasks();
        }, {
            pending: loadingMsg,
            success: updateMsg,
            error: {
                render({ toastProps }) {
                    const res = toastProps.data as any
                    const error = res.data.error ?? errorMsg
                    return error 
                },
            },
        })
    }

    const addComment = async () => {
        toast.promise(async () => {
            await addCommentFn({
                id: task.taskId,
                comments:
                    [
                        ...task.comments ?? [],
                        { commentName: currentComment, commentDate: new Date() }
                    ]
            }).unwrap()
            setCurrentComment('');
            refetchTasks();
        }, {
            pending: loadingMsg,
            success: updateMsg,
            error: {
                render({ toastProps }) {
                    const res = toastProps.data as any
                    const error = res.data.error ?? res.error ?? errorMsg
                    return error
                },
            },
        })
    }

    const handleDeleteAlertOpen = (task: Task) => {
        setOpenDeleteAlert(true);
        setSelectedTask(task);
    };

    useEffect(() => {
        dispatch(setLoading(changeCompleteTaskIsLoading))
    }, [dispatch, changeCompleteTaskIsLoading])

    useEffect(() => {
        dispatch(setLoading(addCommentIsLoading))
    }, [dispatch, addCommentIsLoading])

    return (
        <>
            <TableRow
                key={task.taskId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell style={{ maxWidth: 30 }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{task.taskName}</TableCell>
                <TableCell align="center">{task.description}</TableCell>
                <TableCell align="center">{task.dueDate.toString().split('T').join(' | ').split('.')[0]}</TableCell>
                <TableCell align="center">
                    <Checkbox color="success"
                        checked={task.isCompleted}
                        onChange={checkCompleteTask}
                    />
                </TableCell>
                <TableCell align="center" style={{ maxWidth: 150 }}>
                    {task.tags.length > 0 ?
                        task.tags.map((tag, i) => < Chip key={`tag${i}`} label={tag} />)
                        :
                        <></>
                    }
                </TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={() => handleDeleteAlertOpen(task)}
                    >
                        <DeleteIcon style={{ color: 'white' }} />
                    </IconButton>
                    <IconButton
                        onClick={() => openUpdateModal(task)}
                    >
                        <EditIcon style={{ color: 'white' }} />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>

                            {!task.comments || task.comments.length < 1 ?

                                <Typography variant='h4' align='center'>No Comment For This Task</Typography>
                                :
                                <>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Comments
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ maxWidth: 200 }}>Date</TableCell>
                                                <TableCell>Comment</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                task.comments?.map((comment, i) => (
                                                    <TableRow key={`${i}-${comment}`}>
                                                        <TableCell component="th" scope="row">
                                                            {comment.commentDate.toString().split('T').join(' | ').split('.')[0]}
                                                        </TableCell>
                                                        <TableCell>{comment.commentName}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </>
                            }
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    label="Enter New Comment"
                                    variant="standard"
                                    style={{ margin: '20px 0' }}
                                    value={currentComment}
                                    onChange={(e) => { setCurrentComment(e.target.value) }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CommentIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                                <Button style={{ height: 50, marginLeft: 30 }} variant='contained'
                                    onClick={addComment}
                                > Add Comment</Button>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow >
            {/* Delete Alert */}
            <DeleteAlert open={openDeleteAlert} setOpen={setOpenDeleteAlert} selectedTask={selectedTask} refetchTasks={refetchTasks} />
        </>

    )
}