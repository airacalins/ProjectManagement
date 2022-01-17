import { useEffect, useMemo, useState } from "react";
import { Button } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import FormContainer from "../../app/layouts/components/form/FormContainer";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import FormSelectInput from "../../app/layouts/components/form/FormSelectInput";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { createTenantsAsync, fetchTenantDetailsAsync } from "./tenantSlice";
import { fetchSlotsAsync } from "../slot/slotSlice";
import FormDateInput from "../../app/layouts/components/form/FormDateInput";
import { ICreateTenantInput } from "../../app/models/tenant";
import { format } from "date-fns";
import history from '../../app/utils/history';

interface ITenantInput {
    id: string;
    firstName: string;
    lastName: string;
    companyName: string;
    address: string;
    contact: string;
    slotId?: string;
    startDate: Date;
    endDate: Date;
  }

const TenantForm = () => {
    
    const { id, slotId: routeSlotId } = useParams<{ id: string, slotId: string }>();
    const [tenant, setTenant] = useState<ITenantInput>({ id: "", firstName: "", lastName: "", companyName: "", address: "", contact: "", slotId: undefined, startDate: new Date(), endDate: new Date() })    
    
    const { tenant: tenantData, isFetchingDetails } = useAppSelecter(state => state.tenant);
    const dispatch = useAppDispatch();
    
    const { slots, isFetching: isFetchingSlots, isSaving } = useAppSelecter(state => state.slot);

    useEffect(() => {
        dispatch(fetchSlotsAsync());
    }, [])


    useEffect(() => {
       if(id) dispatch(fetchTenantDetailsAsync(id));
    }, [id])
    
    useEffect(() => {
        tenantData && setTenant(prev => { return {...prev, fullName: tenantData.firstName, companyName: tenantData.companyName, address: tenantData.address, contact: tenantData.phone,
        slotId: !!tenantData.slotContract ? tenantData.slotContract.slot.id : routeSlotId }});
     }, [tenantData])

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required."),
        lastName: Yup.string().required("Last Name is required."),
        address: Yup.string().required("Address is required."),
        contact: Yup.string().required("Contact Number is required."),
        startDate: Yup.string().required("Start date is required."),
        endDate: Yup.string().required("End date is required."),
    })

    if (isFetchingDetails || isFetchingSlots) return (<LoadingComponent content="Loading tenants and slot..." />)

    const onSubmit = async (values:ITenantInput) => {
        if (!values.firstName)
            return;
        await dispatch(createTenantsAsync({...values, startDate: format(values.startDate, 'yyyy-MM-dd'), endDate: format(values.startDate, 'yyyy-MM-dd'), slotId: values.slotId ?? ''}));
        history.push('/tenants')
    }

    return (
        <FormContainer
            title={id ? "Update Tenant" : "New Tenant"}
            children={
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={tenant}
                    onSubmit={values => {
                        onSubmit(values);
                    }}>
                    {
                        ({ handleSubmit, touched, isValid }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                <FormSelectInput options={slots.map(s => ({ text: s.slotNumber, value: s.id }))} name="slotId" placeholder="Slot Number" label="Slot Number" />
                                
                                <FormTextInput name="firstName" placeholder="First Name" label="First Name" />
                                <FormTextInput name="lastName" placeholder="Last Name" label="Last Name" />
                                <FormTextInput name="companyName" placeholder="Business Name" label="Business Name"/>
                                <FormTextInput name="address" placeholder="Address" label="Address" />
                                <FormTextInput name="contact" placeholder="Contact Number" label="Contact Number" />
                                <FormDateInput name="startDate" placeholderText="Start date" label="Start Date" />
                                <FormDateInput name="endDate" placeholderText="End date" label="End Date" />
                                <div>
                                    <Button type="submit" content="Submit" color="orange" disabled={!isValid || isSaving} loading={isSaving} />
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