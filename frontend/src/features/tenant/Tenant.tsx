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
import { Label } from "semantic-ui-react";

const Tenant = () => {
    const [searchKey, setSearchKey] = useState('');
    const { tenants, isFetching: isFetchingTenants } = useAppSelecter(state => state.tenant);

    const dispatch = useAppDispatch();

    const data = useMemo(() => {
        if (!!searchKey) {
            return tenants.filter(i => i.firstName.toLowerCase().includes(searchKey.toLowerCase()));
        }
        return tenants;
    }, [tenants, searchKey])

    useEffect(() => {
        dispatch(fetchTenantsAsync());
    }, [])

    const columns = [
        { title: 'Full Name' },
        { title: 'Business Name' },
        { title: 'Contact Number' },
        { title: 'Slot' },
        { title: '' },
    ]

    if (isFetchingTenants) return <LoadingComponent content="Loading Tenants..." />

    return (
        <MainPage
            title="Tenants"
            content={
                <CustomTable
                    columns={columns}
                    rows=
                    {
                        tenants.map(tenant => <TableRow key={tenant.id}>

                            <TableCell align="center">
                                {`${tenant.firstName} ${tenant.lastName}`}
                            </TableCell>

                            <TableCell align="center">
                                {tenant.companyName}
                            </TableCell>

                            <TableCell align="center">
                                {tenant.phone}
                            </TableCell>

                            <TableCell align="center">
                                <Label content={tenant.slotContract?.slot}></Label>
                            </TableCell>

                            <TableCell align="right">
                                <NavigateNextOutlinedIcon onClick={() => history.push(`/tenants/${tenant.id}/details`)} />
                            </TableCell>

                        </TableRow>
                        )
                    }
                    searchValue={searchKey}
                    onSearch={(value: string) => setSearchKey(value)}
                    buttonTitle="Tenant"
                    navigateTo="/tenants/create"
                />
            }
        />
    );
}

export default Tenant;