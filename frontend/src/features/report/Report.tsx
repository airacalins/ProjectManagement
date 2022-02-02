import { useEffect, useState } from 'react';
import { ReportType } from '../../app/models/report';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Select } from "semantic-ui-react";
import MainPage from '../../app/layouts/components/pages/MainPage';
import { useAppDispatch, useAppSelecter } from '../../app/store/configureStore';
import { fetchInvoiceReportAsync } from './reportSlice';
import CustomTable from '../../app/layouts/components/table/CustomTable';
import DatePicker from 'react-datepicker';


const Report = () => {
    const { report, isFetching } = useAppSelecter(state => state.report);
    const dispatch = useAppDispatch();

    const [selectedReportType, setSelectedReportType] = useState<ReportType | undefined>(ReportType.Daily);
    const [selectedDate, setSelectedDate] = useState<string | undefined>((new Date()).toDateString());

    useEffect(() => {
        dispatch(fetchInvoiceReportAsync({ reportType: selectedReportType, date: selectedDate }));
    }, [selectedReportType, selectedDate])

    const columns = [
        { title: '' },
        { title: 'Quantity' },
        { title: 'Amount' }
    ]

    const reportOptions = [
        { text: "All", value: undefined },
        { text: "Daily", value: ReportType.Daily },
        { text: "Weekly", value: ReportType.Weekly },
        { text: "Monthly", value: ReportType.Monthly },
        { text: "Yearly", value: ReportType.Yearly },

    ]
    return (
        <MainPage
            title="Reports"
            content={
                <CustomTable
                    searchValue={undefined}
                    onSearch={undefined}
                    columns={columns}
                    tableControls={
                        <div className='d-flex align-items-center'>
                            <Select
                                className='me-2'
                                options={reportOptions}
                                value={selectedReportType}
                                onChange={(e, d) => setSelectedReportType(!!d.value ? d.value as ReportType : undefined)}
                                name="report type"
                                placeholder="Report type"
                            />
                            <DatePicker
                                className="form__input"
                                selected={(!!selectedDate && new Date(selectedDate)) || null}
                                onChange={value => setSelectedDate(value && value.toDateString() || undefined)}
                                dateFormat={"MMMM d, yyyy"}
                            />
                        </div>
                    }
                    rows={
                        !report ?
                            [
                                <TableRow>
                                    <TableCell align="center" colSpan={columns.length}>No data</TableCell>
                                </TableRow>
                            ]
                            : [
                                <TableRow>
                                    <TableCell align="left">Generated Invoice</TableCell>
                                    <TableCell align="center">{report.invoice.quantity}</TableCell>
                                    <TableCell align="center">{report.invoice.amount}</TableCell>
                                </TableRow>,

                                <TableRow>
                                    <TableCell align="left">Paid Invoice</TableCell>
                                    <TableCell align="center">{report.paid.quantity}</TableCell>
                                    <TableCell align="center">{report.paid.amount}</TableCell>
                                </TableRow>,

                                <TableRow>
                                    <TableCell align="left">Unpaid Invoice</TableCell>
                                    <TableCell align="center">{report.unpaid.quantity}</TableCell>
                                    <TableCell align="center">{report.unpaid.amount}</TableCell>
                                </TableRow>,

                                <TableRow><TableCell align="left">Pending Invoice</TableCell>
                                    <TableCell align="center">{report.pending.quantity}</TableCell>
                                    <TableCell align="center">{report.pending.amount}</TableCell>
                                </TableRow>
                            ]
                    }
                />
            }
        />
    );
}

export default Report;

