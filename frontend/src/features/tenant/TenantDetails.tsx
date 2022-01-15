import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";
import Details from "../../app/layouts/components/common/Details";
import DetailsAction from "../../app/layouts/components/common/DetailsAction";
import DetailsInput from "../../app/layouts/components/common/DetailsInput";
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { dateFormatter } from "../../app/layouts/formatter/common";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchTenantDetailsAsync } from "./tenantSlice";

const TenantDetails = () => {

    const { id } = useParams<{ id: string }>();
    
    const { tenant, isFetchingDetails } = useAppSelecter(state => state.tenant);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTenantDetailsAsync(id));
    }, [])

    if (isFetchingDetails || !tenant) return (<LoadingComponent content="Loading tenant..." />)

    return (
        <ContainerDetails goBackTo="/tenants">
            <Details
                title="Tenant"
                detailsInput={
                    <>
                        <DetailsInput label="Business Name" input={tenant.companyName} />
                        <DetailsInput label="First Name" input={tenant.firstName} />
                        <DetailsInput label="Last Name" input={tenant.lastName} />
                        <DetailsInput label="Address" input={tenant.address} />
                        <DetailsInput label="Contact Number" input={tenant.phone} />
                        <DetailsInput label="Tenant Since" input="input" />
                        <DetailsInput label="contract Start Date" input={dateFormatter(tenant.slotContract?.contractStartDate)} />
                        <DetailsInput label="Contract End Date" input={dateFormatter(tenant.slotContract?.contractEndDate)} />
                        <Table.Row>
                            <Table.Cell>Contact</Table.Cell>
                            <Table.Cell>
                                <div>
                                    <Button as={Link} to={`/tenants/${id}/view-contract`} content="View" color="orange" icon="eye" size="mini"></Button>
                                    <Button as={Link} to={`/tenants/${id}/download-contract`} content="Download" color="blue" icon="download" size="mini"></Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    </>
                }
                detailsButton={
                    <>
                        <DetailsAction name="Edit" icon="pencil" color="yellow" />
                        <DetailsAction name="Delete" icon="trash" color="red" />
                    </>
                }
            />
        </ContainerDetails>
    );
}

export default TenantDetails;