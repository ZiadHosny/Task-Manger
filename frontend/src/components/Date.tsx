import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { taskDateState } from '../utils/atoms';
import { useRecoilState } from 'recoil';

export const DateComponent = () => {
    const [date, setDate] = useRecoilState(taskDateState)

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}  >
            <DateTimeField

                value={dayjs(date)}

                onChange={(e, error) => {
                    if (!error.validationError) {
                        setDate(new Date(JSON.stringify(e)))
                    }

                }}
            />
        </LocalizationProvider>
    );
}