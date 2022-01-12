import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Table, Button, Message } from "semantic-ui-react";
import ContainerDetails from "../../app/layouts/components/container/ContainerDetails"
import Details from "../../app/layouts/components/common/Details";
import DetailsInput from "../../app/layouts/components/common/DetailsInput";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { currencyFormatter, dateFormatter } from "../../app/layouts/formatter/common";

const SlotDetails = () => {

    const { slotStore } = useStore();
    const { initialLoading, slots, loadSlot, selectSlot, selectedSlot: slot } = slotStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!slots) selectSlot(+id);
        if (!slot) loadSlot(+id);
    }, [id, slots, selectSlot, slot, loadSlot])

    if (initialLoading || !slot) return (<LoadingComponent content="Loading slot details..." />)

    return (
        <ContainerDetails goBackTo={"/slots"} >

            <Details
                title="Slot"
                detailsInput={
                    <>
                        <DetailsInput label="Slot Number" input={slot.slotNumber} />
                        <DetailsInput label="Size" input={`${slot.size} sqm.`} />
                        <DetailsInput label="Rental Fee" input={currencyFormatter(slot.price)} />
                        <DetailsInput label="Next Billing Date" input="input" />
                    </>
                }
                detailsButton={
                    <Button.Group vertical>
                        <Button as={Link} to={`/slots/${slot.id}/manage`} content="Edit" color="yellow" />
                        <Button content="Delete" color="red" style={{ marginTop: "10px" }} />
                    </Button.Group>
                }
            />

            {
                slot.tenantContract?.tenant ?
                    <>
                        <Details
                            title="Tenant"
                            detailsInput={
                                <>
                                    <DetailsInput label="Business Name" input={slot.tenantContract?.tenant.companyName} />
                                    <DetailsInput label="Full Name" input={slot.tenantContract?.tenant.fullName} />
                                    <DetailsInput label="Address" input={slot.tenantContract?.tenant.address} />
                                    <DetailsInput label="Contact Number" input={slot.tenantContract?.tenant.contact} />
                                </>
                            }
                            detailsButton={
                                <Button.Group vertical>
                                    <Button content="Edit" color="yellow" />
                                </Button.Group>
                            }
                        />

                        <Details
                            title="Contract"
                            detailsInput={
                                <>
                                    <DetailsInput label="Advance Payment" input={currencyFormatter(slot.tenantContract?.advance)} />
                                    <DetailsInput label="Deposit" input={currencyFormatter(slot.tenantContract?.deposit)} />
                                    <DetailsInput label="Contract Price" input={currencyFormatter(slot.tenantContract?.contractPrice)} />
                                    <DetailsInput label="Contract Start Date" input={dateFormatter(slot.tenantContract?.contractStartDate)} />
                                    <DetailsInput label="Contract End Date" input={dateFormatter(slot.tenantContract?.contractEndDate)} />
                                    <Table.Row>
                                        <Table.Cell>Contract</Table.Cell>
                                        <Table.Cell>
                                            <div>
                                                <Button as={Link} to="/tenants/1/contact" content="View" color="orange" icon="eye" size="mini"></Button>
                                                <Button as={Link} to="/tenants/1/details" content="Download" color="blue" icon="download" size="mini"></Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                </>
                            }
                            detailsButton={
                                <Button.Group vertical>
                                    <Button content="Extend Contract" color="blue" />
                                    <Button content="Terminate Contract" color="red" style={{ marginTop: "10px" }} />
                                </Button.Group>
                            }
                        />
                    </> :

                    <Details
                        title="Tenant"
                        detailsInput={
                            <Message>
                                <Button as={Link} to="/tenants/create" content="Add tenant" color="orange" />
                            </Message>
                        }
                    />
            }



        </ContainerDetails>

    );
}

export default observer(SlotDetails);