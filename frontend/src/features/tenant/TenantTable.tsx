import { ITenant } from "../../app/models/tenant";
import { Label } from 'semantic-ui-react';
import history from '../../app/utils/history';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CustomTable from '../../app/layouts/components/table/CustomTable';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
    tenants: ITenant[]
}

const TenantTable = ({ tenants }: Props) => {

    const columns = [
        { title: 'Full Name' },
        { title: 'Business Name' },
        { title: 'Contact Number' },
        { title: 'Slot' },
        { title: '' },
    ]

    return (
        <CustomTable
            columns={columns}
            rows={tenants.map(tenant => <TableRow key={tenant.id}>

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
                    {/* <Label content={tenant.slot}></Label> */}
                </TableCell>

                <TableCell align="right">
                    <VisibilityIcon onClick={() => history.push(`/tenants/${tenant.id}/details`)} />
                </TableCell>

            </TableRow>
            )}
        />
    )
}

export default TenantTable;