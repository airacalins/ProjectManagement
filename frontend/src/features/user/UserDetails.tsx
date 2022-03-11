import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import DeleteButton from '../../app/layouts/components/buttons/DeleteButton';
import NavigationButton from '../../app/layouts/components/buttons/NavigationButton';
import FormButtonContainer from '../../app/layouts/components/form/FormButtonContainer';
import DetailItem from '../../app/layouts/components/items/DetailItem';
import LoadingComponent from '../../app/layouts/components/loading/LoadingComponent';
import DetailsPage from '../../app/layouts/components/pages/DetailsPage';
import { useAppDispatch, useAppSelecter } from '../../app/store/configureStore';
import history from '../../app/utils/history';
import { deleteUserDetailsAsync, fetchUserDetailsAsync, fetchUsersAsync } from './UserSlice';

const UserDetails = () => {
    const { user, isFetchingDetails, isSaving } = useAppSelecter(state => state.user);
    const account = useAppSelecter(state => state.account);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    const canEdit = useMemo(() => {
        if (!!user) {
            const isAdmin = account?.user?.roles.some(i => i.toLowerCase() === "admin");
            if (isAdmin) return false;

            const isOwner = user.roles.some(i => i.toLowerCase() === "owner");
            if (isOwner) return false;

            return true;
        }

        return false;
    }, [user]);

    useEffect(() => {
        if (id) dispatch(fetchUserDetailsAsync(id));
    }, [])

    const handleDelete = async (id: string) => {
        await dispatch(deleteUserDetailsAsync(id));
        history.push("/users");
        dispatch(fetchUsersAsync())
    }


    if (isFetchingDetails || !user) return (<LoadingComponent content="Loading staffs details..." />)

    const { username, firstName, lastName, phone, email, address, roles } = user

    return (
        <DetailsPage
            title="Staff Details"
            backNavigationLink='/users'
            content={
                <>
                    <DetailItem title="Username" value={username} />
                    <DetailItem title="First Name" value={firstName} />
                    <DetailItem title="Last Name" value={lastName} />
                    <DetailItem title="Contact Number" value={phone} />
                    <DetailItem title="Address" value={address} />
                    <DetailItem title="Role" value={roles.join(", ")} />
                    {canEdit &&
                        <FormButtonContainer>
                            <NavigationButton title="Edit" navigateTo={`/users/${user.id}/manage`} />
                            <DeleteButton onClick={() => handleDelete(user.id)} loading={isSaving} />
                        </FormButtonContainer>
                    }
                </>
            }
        />
    );
}

export default UserDetails;