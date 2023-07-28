import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTasks } from '../hooks/useTasks';
import { Box, Button, Checkbox, Chip, Collapse, IconButton, InputAdornment, Pagination, TableSortLabel, TextField, Typography } from '@mui/material';
import { createOrUpdateTaskState, openCreateOrUpdateTaskState } from '../utils/atoms';
import { useRecoilState } from 'recoil';
import { CreateTask } from './CreateTask';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useCompleteTask } from '../hooks/useCompleteTask';
import { Task } from '../utils/types';
import { useAddComment } from '../hooks/useAddComment';

export const TaskTable = () => {
    const [{ value }, getAllTasks] = useTasks()
    const [{ }, changeTaskCompletion] = useCompleteTask()
    const [{ value: addCommentSuccessfully }, addComment] = useAddComment()
    const [{ value: taskDeleted }, deleteTask] = useDeleteTask()
    const [currentPage, setCurrentPage] = React.useState(1)
    const [createOrUpdateTask, setCreateOrUpdateTask] = useRecoilState(createOrUpdateTaskState)
    const [_, setOpenCreateTask] = useRecoilState(openCreateOrUpdateTaskState)

    const deleteTaskBtn = async (id: string) => {
        await deleteTask(id)
    }

    React.useEffect(() => {
        getAllTasks({})
    }, [])

    React.useEffect(() => {
        getAllTasks({ page: currentPage })
        setCreateOrUpdateTask(false)
    }, [taskDeleted, createOrUpdateTask, addCommentSuccessfully, currentPage])

    const TableTitle = ({ label, sort }: { label: string, sort: string }) => {

        return (
            <TableSortLabel
                onClick={() => { getAllTasks({ sort }) }}
            >
                {label}
            </TableSortLabel>
        )
    }

    const Row = ({ task }: { task: Task }) => {
        const [currentComment, setCurrentComment] = React.useState('');
        const [open, setOpen] = React.useState(false);
        return (
            <>
                < TableRow
                    key={task.taskId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
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
                            onChange={() => {
                                changeTaskCompletion({ taskId: task.taskId, isCompleted: !task.isCompleted })
                            }}

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
                            onClick={() => deleteTaskBtn(task.taskId)}
                        >
                            <DeleteIcon style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton
                            onClick={() => setOpenCreateTask({ createOrUpdate: 'update', open: true, task })}
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
                                        onClick={() => {
                                            addComment({
                                                taskId: task.taskId,
                                                comments:
                                                    [
                                                        ...task.comments ?? [],
                                                        { commentName: currentComment, commentDate: new Date() }
                                                    ]
                                            })
                                        }}
                                    > Add Comment</Button>
                                </Box>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow >
            </>

        )
    }


    return (
        <>
            <Box style={{ margin: 30, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained' onClick={() => { setOpenCreateTask({ createOrUpdate: 'create', open: true }) }}> Create Task</Button>
            </Box>
            {value?.count && value?.count <= 0 ?
                <div>No Tasks Found</div>
                :
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead style={{ background: 'black' }}>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center">Task Name</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">
                                        <TableTitle label='Due Date' sort={'dueDate'} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TableTitle label='Is Completed' sort={'-isCompleted'} />
                                    </TableCell>
                                    <TableCell align="center">Tags</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {value?.tasks?.map((task) => <Row task={task} />)}
                            </TableBody>
                        </Table>
                        {value?.count && value?.count > 5 ?
                            <Pagination
                                style={{ padding: 30, display: 'flex', justifyContent: 'flex-end' }}
                                count={Math.ceil(value.count / 5)}
                                onChange={(_, page) => { setCurrentPage(page); getAllTasks({ page }) }}
                            />
                            :
                            <></>
                        }
                    </TableContainer >
                </>
            }
            <CreateTask />

        </>
    );
}