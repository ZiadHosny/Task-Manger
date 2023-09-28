import { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    Box, Button, Pagination, TableSortLabel
} from '@mui/material';
import { CreateTask } from './CreateTask';
import { useAppDispatch } from '../store/hooks';
import { setModal } from '../store/modalSlice';
import { useGetAllTasksQuery } from '../store/taskApiSlice';
import { setLoading } from '../store/loadingSlice';
import { TaskRow } from './TaskRow';

export const TaskTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [sort, setSort] = useState('')

    const dispatch = useAppDispatch()

    const { data: value, isLoading, refetch, } = useGetAllTasksQuery({ page: currentPage, sort })

    const openCreateModal = () => {
        dispatch(setModal({ createOrUpdate: 'create', open: true }))
    }

    useEffect(() => {
        dispatch(setLoading(isLoading))
    }, [dispatch, setLoading, isLoading])


    const TableTitle = ({ label, sort }: { label: string, sort: string }) => (
        <TableSortLabel
            onClick={() => {
                setSort(sort)
            }} >
            {label}
        </TableSortLabel>
    )

    return (
        <>
            <Box style={{ margin: 30, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained' onClick={openCreateModal}> Create Task</Button>
            </Box>
            {!value?.count || value?.count <= 0 ?
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
                                {value?.tasks?.map((task: any, i: any) =>
                                    <TaskRow
                                        refetchTasks={refetch}
                                        task={task} key={`${i}=${task}`} />
                                )}
                            </TableBody>
                        </Table>
                        {value?.count && value?.count > 5 ?
                            <Pagination
                                style={{ padding: 30, display: 'flex', justifyContent: 'flex-end' }}
                                count={Math.ceil(value.count / 5)}
                                onChange={(_, page) => {
                                    setCurrentPage(page);
                                }}
                            />
                            :
                            <></>
                        }
                    </TableContainer >
                </>
            }
            <CreateTask refetch={refetch} />

        </>
    );
}