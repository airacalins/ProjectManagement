import { useEffect, useState } from "react";
import history from "../../app/utils/history";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchTenantDetailsAsync, createTenantsAsync } from "./tenantSlice";
import { fetchSlotsAsync } from "../slot/slotSlice";
import { SlotStatus } from "../../app/models/slot";

import FormDateInput from "../../app/layouts/components/form/FormDateInput";
import FormPage from "../../app/layouts/components/pages/FormPage";
import FormSelectInput from "../../app/layouts/components/form/FormSelectInput";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import AddButton from "../../app/layouts/components/buttons/AddButton";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";
import { ICreateTenantInput } from "../../app/models/tenant";

const futureDate = () => {
    const currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day = currentDate.getDate();
    return new Date(year + 1, month, day);
}

const TenantForm = () => {
    const { slotId } = useParams<{ slotId: string }>();
    const [slotsLoaded, setSlotsLoaded] = useState(false);

    const [tenant, setTenant] = useState<ICreateTenantInput>({
        id: "",
        firstName: "",
        lastName: "",
        businessName: "",
        address: "",
        contact: "",
        slotId: undefined,
        startDate: new Date(),
        endDate: futureDate()
    })

    const { isFetching: isFetchingTenants, isSaving } = useAppSelecter(state => state.tenant);
    const { slots: slotsData } = useAppSelecter(state => state.slot);

    const dispatch = useAppDispatch();

    const fetchSlots = async () => {
        await dispatch(fetchSlotsAsync());
        setSlotsLoaded(true);
    }

    useEffect(() => {
        fetchSlots();
    }, [])


    useEffect(() => {
        if (slotId && slotsLoaded)
            setTenant(prev => {
                return { ...prev, slotId }
            })
    }, [slotId, slotsLoaded])

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required."),
        lastName: Yup.string().required("Last Name is required."),
        address: Yup.string().required("Address is required."),
        contact: Yup.string().required("Contact Number is required."),
        startDate: Yup.string().required("Start date is required."),
        endDate: Yup.string().required("End date is required."),
    })

    if (isFetchingTenants) return (<LoadingComponent content="Loading tenants and slot..." />)

    const onSubmit = async (values: ICreateTenantInput) => {
        if (!values.firstName)
            return;
        await dispatch(createTenantsAsync({
            ...values,
            startDate: new Date(),
            endDate: futureDate(),
            slotId: !!slotId ? slotId : values.slotId
        }));
        history.push('/tenants')
    }

    return (
        <FormPage
            title="New Tenant"
            backNavigationLink="/tenants"
            form={
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={tenant}
                    onSubmit={values => onSubmit(values)}>
                    {
                        ({ handleSubmit, isValid }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >

                                <FormSelectInput
                                    options={slotsData.filter(i => i.status === SlotStatus.Available).map(s => ({ text: s.slotNumber, value: s.id }))}
                                    name="slotId"
                                    placeholder="Slot Number"
                                    label="Slot Number"
                                />

                                <FormTextInput name="firstName" placeholder="First Name" label="First Name" />
                                <FormTextInput name="lastName" placeholder="Last Name" label="Last Name" />
                                <FormTextInput name="businessName" placeholder="Business Name" label="Business Name" />
                                <FormTextInput name="address" placeholder="Address" label="Address" />
                                <FormTextInput name="contact" placeholder="Contact Number" label="Contact Number" />
                                <FormDateInput name="startDate" placeholderText="Start date" label="Start Date" />
                                <FormDateInput name="endDate" placeholderText="End date" label="End Date" />

                                <FormButtonContainer>
                                    <AddButton loading={isSaving} disabled={!isValid} />
                                </FormButtonContainer>
                            </Form>
                        )
                    }
                </Formik>
            }
        />
    )
}

export default TenantForm;