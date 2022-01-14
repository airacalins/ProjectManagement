import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import FormContainer from "../../app/layouts/components/form/FormContainer";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import FormSelectInput from "../../app/layouts/components/form/FormSelectInput";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchTenantDetailsAsync } from "./tenantSlice";
import { fetchSlotsAsync } from "../slot/slotSlice";

interface ITenantInput {
    id: string;
    fullName: string;
    companyName: string;
    address: string;
    contact: string;
    slotId?: string;
}

const TenantForm = () => {
    
    const { id, slotId: routeSlotId } = useParams<{ id: string, slotId: string }>();
    const [tenant, setTenant] = useState<ITenantInput>({ id: "", fullName: "", companyName: "", address: "", contact: "", slotId: undefined })    
    
    const { tenant: tenantData, isFetchingDetails } = useAppSelecter(state => state.tenant);
    const dispatch = useAppDispatch();
    
    const { slots, isFetching: isFetchingSlots } = useAppSelecter(state => state.slot);

    useEffect(() => {
        dispatch(fetchSlotsAsync());
    }, [])


    useEffect(() => {
       if(id) dispatch(fetchTenantDetailsAsync(id));
    }, [id])
    
    useEffect(() => {
        tenantData && setTenant(prev => { return {...prev, fullName: tenantData.fullName, companyName: tenantData.companyName, address: tenantData.address, contact: tenantData.phone,
        slotId: !!tenantData.slotContract ? tenantData.slotContract.slot.id : routeSlotId }});
     }, [tenantData])


    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required."),
        companyName: Yup.string().required("Business Name is required."),
        address: Yup.string().required("Address is required."),
        contact: Yup.string().required("Contact Number is required.")
    })

    if (isFetchingDetails) return (<LoadingComponent content="Loading tenants..." />)

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
                                    <Button type="button" as={Link} to={id ? `/tenants/${tenantData?.id}/details` : "/tenants"} content="Cancel" />
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            }
        />
    )
}

export default TenantForm;