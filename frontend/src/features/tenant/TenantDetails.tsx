import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";
import Details from "../../app/layouts/components/common/Details";
import DetailsAction from "../../app/layouts/components/common/DetailsAction";
import DetailsInput from "../../app/layouts/components/common/DetailsInput";
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { dateFormatter } from "../../app/layouts/formatter/common";
import { useStore } from "../../app/stores/store";

const TenantDetails = () => {

    const { tenantStore } = useStore();
    const { tenants, loadTenant, selectTenant, initialLoading, selectedTenant: tenant } = tenantStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!tenants) selectTenant(+id);
        if (!tenant) loadTenant(+id);
    }, [id, tenants, selectTenant, tenant, loadTenant])

    if (initialLoading || !tenant) return (<LoadingComponent content="Loading tenant..." />)

    return (
        <ContainerDetails goBackTo="/tenants">
            <Details
                title="Tenant"
                detailsInput={
                    <>
                        <DetailsInput label="Business Name" input={tenant.companyName} />
                        <DetailsInput label="Full Name" input={tenant.fullName} />
                        <DetailsInput label="Address" input={tenant.address} />
                        <DetailsInput label="Contact Number" input={tenant.contact} />
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

export default observer(TenantDetails);