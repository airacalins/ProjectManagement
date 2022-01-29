import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchModeOfPaymentsAsync, updateModeOfPaymentDetailsAsync, updateStatus } from "./modeOfPaymentSlice";
import history from '../../app/utils/history';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import CustomTable from "../../app/layouts/components/table/CustomTable";

const ModeOfPayment = () => {
    const [searchKey, setSearchKey] = useState('');
    const { modeOfPayments, isFetching: isFetchingModeOfPayments } = useAppSelecter(state => state.modeOfPayment);
    const dispatch = useAppDispatch();

    const data = useMemo(() => {
        if (!!searchKey) {
            return modeOfPayments.filter(i =>
                i.bankName.toLowerCase().includes(searchKey.toLowerCase()) ||
                i.accountName.toLowerCase().includes(searchKey.toLowerCase())
            );
        }
        return modeOfPayments;
    }, [modeOfPayments, searchKey])

    useEffect(() => {
        dispatch(fetchModeOfPaymentsAsync());
    }, [])

    const onUpdate = async (values: any) => {
        await dispatch(updateModeOfPaymentDetailsAsync(values));
        dispatch(updateStatus(values))
    }

    const columns = [
        { title: 'Bank Name' },
        { title: 'Account Name' },
        { title: 'Account Number' },
        { title: 'Show/Hide' },
        { title: '' },
    ]

    if (isFetchingModeOfPayments) return <LoadingComponent content="Loading Mode of Payments..." />

    return (
        <MainPage
            title="Mode of Payment"
            content={
                <CustomTable
                    searchValue={searchKey}
                    onSearch={(value: string) => setSearchKey(value)}
                    buttonTitle="Add Mode of Payment"
                    navigateTo="/mode-of-payments/create"
                    columns={columns}
                    rows={
                        !data.length ?
                            [
                                <TableRow>
                                    <TableCell align="center" colSpan={columns.length}>
                                        No data
                                    </TableCell>
                                </TableRow>
                            ]
                            :
                            data.map(mop =>
                                <TableRow key={mop.id}>

                                    <TableCell align="center">
                                        {mop.bankName}
                                    </TableCell>

                                    <TableCell align="center">
                                        {mop.accountName}
                                    </TableCell>

                                    <TableCell align="center">
                                        {mop.accountNumber}
                                    </TableCell>

                                    <TableCell align="center">
                                        <div onClick={() => onUpdate(mop)}>
                                            {mop.isEnabled ? <ToggleOnOutlinedIcon fontSize="medium" /> : <ToggleOffOutlinedIcon fontSize="medium" />}
                                        </div>
                                    </TableCell>

                                    <TableCell align="right">
                                        <NavigateNextOutlinedIcon onClick={() => history.push(`/mode-of-payments/${mop.id}/details`)} />
                                    </TableCell>

                                </TableRow>
                            )
                    }
                />
            }
        />
    );
}

export default ModeOfPayment;