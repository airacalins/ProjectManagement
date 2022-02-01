import React, { useEffect, useMemo, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MainPage from '../../app/layouts/components/pages/MainPage';
import CustomTable from '../../app/layouts/components/table/CustomTable';
import history from '../../app/utils/history';
import { useAppDispatch, useAppSelecter } from '../../app/store/configureStore';
import { deleteUserDetailsAsync, fetchUserDetailsAsync, fetchUsersAsync, updateUserDetailsAsync } from './UserSlice';
import LoadingComponent from '../../app/layouts/components/loading/LoadingComponent';
import DeleteButton from '../../app/layouts/components/buttons/DeleteButton';
import { Label } from 'semantic-ui-react';
import NavigationButton from '../../app/layouts/components/buttons/NavigationButton';
import { useParams } from 'react-router-dom';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';


const User = () => {
    const { id } = useParams<{ id: string }>();
    const [searchKey, setSearchKey] = useState('');
    const { users, isFetching: isFetchingUsers, isSaving } = useAppSelecter(state => state.user);

    const dispatch = useAppDispatch();

    const data = useMemo(() => {
        if (!!searchKey) {
            return users.filter(i =>
                i.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
                i.lastName.toLowerCase().includes(searchKey.toLowerCase())
            );
        }
        return users;
    }, [users, searchKey])

    useEffect(() => {
        dispatch(fetchUsersAsync())
    }, [])

    const columns = [
        { title: 'Username' },
        { title: 'Full Name' },
        { title: 'Contact Number' },
        { title: 'Address' },
        { title: '' },
    ]

    if (isFetchingUsers || isSaving) return <LoadingComponent content="Loading users..." />

    return (
        <MainPage
            title="App Users"
            content={
                <CustomTable
                    searchValue={searchKey}
                    onSearch={(value: string) => setSearchKey(value)}
                    buttonTitle="Add User"
                    navigateTo="/users/create"
                    columns={columns}
                    rows={
                        !data.length ?
                            [
                                <TableRow>
                                    <TableCell align="center" colSpan={8}>
                                        No data
                                    </TableCell>
                                </TableRow>
                            ]
                            :
                            data.map(user =>
                                <TableRow key={user.id}>
                                    <TableCell align="center">
                                        {user.username}
                                    </TableCell>

                                    <TableCell align="center">
                                        {`${user.firstName} ${user.lastName}`}
                                    </TableCell>

                                    <TableCell align="center">
                                        {user.phone}
                                    </TableCell>

                                    <TableCell align="center">
                                        {user.address}
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