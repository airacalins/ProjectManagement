import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchModeOfPaymentsAsync } from "./modeOfPaymentSlice";
import history from '../../app/utils/history';
import { Icon } from 'semantic-ui-react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import CustomTable from "../../app/layouts/components/table/CustomTable";

const ModeOfPayment = () => {
    const [searchKey, setSearchKey] = useState('');
    const { modeOfPayments, isFetching: isFetchingModeOfPayments } = useAppSelecter(state => state.modeOfPayment);

    const dispatch = useAppDispatch();

    const data = useMemo(() => {
        if (!!searchKey) {
            return modeOfPayments.filter(i => i.bankName.toLowerCase().includes(searchKey.toLowerCase()));
        }
        return modeOfPayments;
    }, [modeOfPayments, searchKey])

    useEffect(() => {
        dispatch(fetchModeOfPaymentsAsync());
    }, [])

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
            title="Mode of Payments"
            content={
                <CustomTable
                    columns={columns}
                    rows=
                    {
                        modeOfPayments.map(mop =>
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
                                    <Icon name="toggle on" color="blue" size="large"></Icon>
                                </TableCell>

                                <TableCell align="right">
                                    <NavigateNextOutlinedIcon onClick={() => history.push(`/mode-of-payments/${mop.id}/details`)} />
                                </TableCell>

                            </TableRow>
                        )
                    }
                    searchValue={searchKey}
                    onSearch={(value: string) => setSearchKey(value)}
                    buttonTitle="Mode of Payment"
                    navigateTo="/mode-of-payments/create"
                />
            }
        />
    );
}

export default ModeOfPayment;