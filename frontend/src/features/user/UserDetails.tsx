import React from 'react';
import DeleteButton from '../../app/layouts/components/buttons/DeleteButton';
import NavigationButton from '../../app/layouts/components/buttons/NavigationButton';
import FormButtonContainer from '../../app/layouts/components/form/FormButtonContainer';
import DetailItem from '../../app/layouts/components/items/DetailItem';
import DetailsPage from '../../app/layouts/components/pages/DetailsPage';

const UserDetails = () => {
    return (
        <DetailsPage
            title="User Details"
            backNavigationLink='/users'
            content={
                <>
                    <DetailItem title="Username" value="Value" />
                    <DetailItem title="First Name" value="Value" />
                    <DetailItem title="Last Name" value="Value" />
                    <DetailItem title="Address" value="Value" />
                    <DetailItem title="Contact Number" value="Value" />

                    <FormButtonContainer>
                        {/* <NavigationButton title="Edit" navigateTo={`/announcements/${announcementId}/manage`} /> */}
                        {/* <DeleteButton onClick={handleDelete} loading={isSaving} /> */}
                    </FormButtonContainer>
                </>
            }
        />
    );
}

export default UserDetails;