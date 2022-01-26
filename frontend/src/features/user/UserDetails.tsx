import React from 'react';
import DetailItem from '../../app/layouts/components/items/DetailItem';
import DetailsPage from '../../app/layouts/components/pages/DetailsPage';

interface Props {

}

const UserDetails: React.FC<Props> = ({ }) => {
    return (
        <DetailsPage
            title="User Details"
            backNavigationLink='/users'
            content={
                <>
                    <DetailItem title="Role" value="" />
                    <DetailItem title="Full Name" value="" />
                    <DetailItem title="Address" value="" />
                    <DetailItem title="Contact Number" value="" />
                    <DetailItem title="Status" value="" />
                </>
            }
        />

    );
}

export default UserDetails;