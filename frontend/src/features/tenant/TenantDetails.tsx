import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { dateFormatter } from "../../app/layouts/formatter/common";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchTenantDetailsAsync } from "./tenantSlice";

import DetailItem from "../../app/layouts/components/items/DetailItem";
import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import NavigationButton from "../../app/layouts/components/buttons/NavigationButton";
import CustomTable from "../../app/layouts/components/table/CustomTable";
import MainPage from "../../app/layouts/components/pages/MainPage";

const TenantDetails = () => {

    const { id } = useParams<{ id: string }>();

    const { tenant, isFetchingDetails } = useAppSelecter(state => state.tenant);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTenantDetailsAsync(id));
    }, [])

    if (isFetchingDetails || !tenant) return (<LoadingComponent content="Loading tenant..." />)

    const { businessName, firstName, lastName, address, phone, contract } = tenant

    return (
        <>
            <DetailsPage
                title="Personal Information"
                backNavigationLink="/tenants"
                content={
                    <>
                        <DetailItem title="Business Name" value={businessName} />
                        <DetailItem title="First Name" value={firstName} />
                        <DetailItem title="Last Name" value={lastName} />
                        <DetailItem title="Address" value={address} />
                        <DetailItem title="Contact Number" value={phone} />
                        <FormButtonContainer>
                            <NavigationButton title="Edit" navigateTo={`/tenants/${id}/manage`} />
                        </FormButtonContainer>
                    </>
                }
            />

            <DetailsPage
                title="Contract"
                content={
                    <>
                        <DetailItem title="Start Date" value={dateFormatter(contract?.startDate)} />
                        <DetailItem title="End Date" value={dateFormatter(contract?.endDate)} />
                        <DetailItem title="Contract" value="" />
                        <FormButtonContainer>
                            <NavigationButton title="Terminate Contract" navigateTo="/" />
                        </FormButtonContainer>
                    </>
                }
            />
        </>
    );
}

export default TenantDetails;