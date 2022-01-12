import { useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import FormContainer from "../../app/layouts/components/form/FormContainer";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import FormSelectInput from "../../app/layouts/components/form/FormSelectInput";

interface TenantInput {
    id: number;
    fullName: string;
    companyName: string;
    address: string;
    contact: string;
    slotId?: number;
}

const TenantForm = () => {
    const { slotStore } = useStore();
    const { loadSlots, loadSlot, slots } = slotStore;

    const { tenantStore } = useStore();
    const { loadTenant, initialLoading, selectedTenant } = tenantStore;
    const { id, slotId: routeSlotId } = useParams<{ id: string, slotId: string }>();
    const [tenant, setTenant] = useState<TenantInput>({ id: 0, fullName: "", companyName: "", address: "", contact: "", slotId: undefined })

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required."),
        companyName: Yup.string().required("Business Name is required."),
        address: Yup.string().required("Address is required."),
        contact: Yup.string().required("Contact Number is required.")
    })

    useEffect(() => {
        if (!slots.length) loadSlots()
    }, [slots.length, loadSlots])

    useEffect(() => {
        if (routeSlotId) {
            loadSlot(+routeSlotId)
            setTenant({ ...tenant, slotId: +routeSlotId })
        }
    }, [loadSlot, routeSlotId])

    useEffect(() => {
        if (id) loadTenant(+id).then(() => setTenant(selectedTenant!))
    }, [id, loadTenant, selectedTenant])

    if (initialLoading) return (<LoadingComponent content="Loading tenants..." />)

    return (
        <FormContainer
            title={id ? "Update Tenant" : "New Tenant"}
            children={
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={tenant}
                    onSubmit={values => console.log(values)}>
                    {
                        ({ handleSubmit }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                <FormSelectInput options={slots.map(s => ({ text: s.slotNumber, value: s.id }))} name="slotId" placeholder="Slot Number" />
                                <FormTextInput name="fullName" placeholder="Full Name" />
                                <FormTextInput name="companyName" placeholder="Business Name" />
                                <FormTextInput name="address" placeholder="Address" />
                                <FormTextInput name="contact" placeholder="Contact Number" />

                                <div>
                                    <Button type="submit" content="Submit" color="orange" />
                                    <Button type="button" as={Link} to={id ? `/tenants/${selectedTenant?.id}/details` : "/tenants"} content="Cancel" />
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            }
        />
    )
}

export default observer(TenantForm);