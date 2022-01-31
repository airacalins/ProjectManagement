import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchTenantsAsync } from "./tenantSlice";
import history from '../../app/utils/history';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import CustomTable from "../../app/layouts/components/table/CustomTable";
import { Label, Select } from 'semantic-ui-react';
import { toast } from "react-toastify";

const Tenant = () => {
    const [searchKey, setSearchKey] = useState('');
    const { tenants, isFetching: isFetchingTenants } = useAppSelecter(state => state.tenant);
    const [selectedStatus, setSelectedStatus] = useState<boolean | undefined>(true);

    const dispatch = useAppDispatch();

    const data = useMemo(() => {
        let searchResult = tenants;
        if (!!searchKey) {
            searchResult = tenants.filter(i => i.firstName.toLowerCase().includes(searchKey.toLowerCase())
                || i.lastName.toLowerCase().includes(searchKey.toLowerCase())
                || i.businessName.toLowerCase().includes(searchKey.toLowerCase())
                || i.phone.toLowerCase().includes(searchKey.toLowerCase())
                || (!!i.contract && i.contract?.slotNumber.toLowerCase().includes(searchKey.toLowerCase())));
        }

        if (!!selectedStatus) {
            searchResult = searchResult.filter(i => i.isActive === selectedStatus)
        }

        return searchResult;
    }, [tenants, searchKey, selectedStatus])

    useEffect(() => {
        dispatch(fetchTenantsAsync());
    }, [])

    const columns = [
        { title: 'Account Number' },
        { title: 'Full Name' },
        { title: 'Business Name' },
        { title: 'Contact Number' },
        { title: 'Slot' },
        { title: 'Status' },
        { title: '' },
    ]

    const tenantStatusOptions = [
        { text: "All", value: undefined },
        { text: "Active", value: true },
        { text: "Not active", value: false }
    ]

    if (isFetchingTenants) return <LoadingComponent content="Loading Tenants..." />

    return (
        <MainPage
            title="Tenants"
            content={
                <CustomTable
                    searchValue={searchKey}
                    onSearch={(value: string) => setSearchKey(value)}
                    buttonTitle="Add Tenant"
                    navigateTo="/tenants/create"
                    columns={columns}
                    tableControls={
                        <Select
                            options={tenantStatusOptions}
                            value={selectedStatus}
                            onChange={(e, d) => setSelectedStatus(!!d.value ? d.value as boolean : undefined)}
                            name="slotId"
                            placeholder="Select status"
                            label="Tenant Status"
                        />
                    }
                    rows=
                    {
                        !data.length ?
                            [
                                <TableRow>
                                    <TableCell align="center" colSpan={columns.length}>
                                        No data
                                    </TableCell>
                                </TableRow>
                            ]
                            :
                            data.map(tenant => <TableRow key={tenant.id}>
                                <TableCell align="center">
                                    {tenant.tenantUniqueId}
                                </TableCell>

                                <TableCell align="center">
                                    {`${tenant.firstName} ${tenant.lastName}`}
                                </TableCell>

                                <TableCell align="center">
                                    {tenant.businessName}
                                </TableCell>

                                <TableCell align="center">
                                    {tenant.phone}
                                </TableCell>

                                <TableCell align="center">
                                    {tenant.contract?.slotNumber}
                                </TableCell>

                                <TableCell align="center">
                                    {
                                        tenant.isActive ?
                                            <Label color="orange" content="Active" /> :
                                            <Label color="red" content="Not Active" />
                                    }
                                </TableCell>

                                <TableCell align="right">
                                    <NavigateNextOutlinedIcon onClick={() => history.push(`/tenants/${tenant.id}/details`)} />
                                </TableCell>

                            </TableRow>
                            )
                    }
                />
            }
        />
    );
}

export default Tenant;