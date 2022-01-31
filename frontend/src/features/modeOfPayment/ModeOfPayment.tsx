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
import { Select } from "semantic-ui-react";

const ModeOfPayment = () => {
    const [searchKey, setSearchKey] = useState('');
    const { modeOfPayments, isFetching: isFetchingModeOfPayments } = useAppSelecter(state => state.modeOfPayment);
    const dispatch = useAppDispatch();
    const [selectedStatus, setSelectedStatus] = useState<boolean | undefined>(undefined);

    const data = useMemo(() => {
        let searchResult = modeOfPayments;
        if (!!searchKey) {
            return modeOfPayments.filter(i =>
                i.bankName.toLowerCase().includes(searchKey.toLowerCase()) ||
                i.accountName.toLowerCase().includes(searchKey.toLowerCase())
            );
        }
        if (!!selectedStatus) {
            searchResult = searchResult.filter(i => i.isEnabled === selectedStatus)
        }
        return searchResult;
    }, [modeOfPayments, searchKey, selectedStatus])

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

    const modeOfPaymentStatusOptions = [
        { text: "All", value: undefined },
        { text: "Showed", value: true },
        { text: "Hidden", value: false }
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
                    tableControls={
                        <Select
                            options={modeOfPaymentStatusOptions}
                            value={selectedStatus}
                            onChange={(e, d) => setSelectedStatus(!!d.value ? d.value as boolean : undefined)}
                            name="modeOfPaymentId"
                            placeholder="Select status"
                            label="Mode of Payment status"
                        />
                    }
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
                                        <div onClick={() => onUpdate({...mop, isEnabled: mop.isEnabled})}>
                                            {mop.isEnabled ?
                                                <ToggleOnOutlinedIcon fontSize="medium" /> :
                                                <ToggleOffOutlinedIcon fontSize="medium" />}
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