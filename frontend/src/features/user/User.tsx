import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

import MainPage from '../../app/layouts/components/pages/MainPage';
import CustomTable from '../../app/layouts/components/table/CustomTable';
import history from '../../app/utils/history';

interface Props {

}

const users = [
    { id: 1, firstName: "Ali", lasNtame: "Baba", role: "Admin", phone: "0928882899288" },
    { id: 2, firstName: "Ali", lastName: "Express", role: "Admin", phone: "09878344343" },
    { id: 3, firstName: "Ali", lastName: "Lala", role: "Finance", phone: "43493984939" }
]

const columns = [
    { title: 'Full Name' },
    { title: 'Role' },
    { title: 'Contact Number' },
    { title: '' },
]

const User: React.FC<Props> = ({ }) => {
    return (
        <MainPage
            title="App Users"
            content={
                <CustomTable
                    // searchValue={searchKey}
                    // onSearch={(value: string) => setSearchKey(value)}
                    buttonTitle="Add User"
                    navigateTo="/users/create"
                    columns={columns}
                    rows={
                        // !data.length ?
                        //     [
                        //         <TableRow>
                        //             <TableCell align="center" colSpan={8}>
                        //                 No data
                        //             </TableCell>
                        //         </TableRow>
                        //     ]
                        //     :
                        users.map(user =>
                            <TableRow key={user.id}>

                                <TableCell align="center">
                                    {`${user.firstName} ${user.lastName}`}
                                </TableCell>

                                <TableCell align="center">
                                    {user.role}
                                </TableCell>

                                <TableCell align="center">
                                    {user.phone}
                                </TableCell>

                                <TableCell align="right">
                                    <NavigateNextOutlinedIcon onClick={() => history.push(`/users/${user.id}/details`)} />
                                </TableCell>
                            </TableRow>
                        )
                    }
                />
            }
        />
    );
}

export default User;