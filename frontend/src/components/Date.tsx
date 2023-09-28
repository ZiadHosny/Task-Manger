import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';


export const DateComponent = ({ date, setDate }: { date: Dayjs, setDate: Function }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}  >
            <DateTimeField
                value={date}
                onChange={(date, error) => {
                    if (!error.validationError) {
                        setDate(dayjs(date))
                    }
                }}
            />
        </LocalizationProvider>
    );
}