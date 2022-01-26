import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchTenantDetailsAsync, createTenantsAsync, updateTenantDetailsAsync } from "./tenantSlice";
import { useParams } from "react-router-dom";
import history from '../../app/utils/history';
import { Form, Formik } from "formik";
import * as Yup from 'yup';

import { Button } from "semantic-ui-react";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

import FormContainer from "../../app/layouts/components/form/FormContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import MainPage from "../../app/layouts/components/pages/MainPage";
import FormSelectInput from "../../app/layouts/components/form/FormSelectInput";
import FormDateInput from "../../app/layouts/components/form/FormDateInput";
import { SlotStatus } from "../../app/models/slot";
import { format } from "date-fns";
import FormPage from "../../app/layouts/components/pages/FormPage";

// import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
// import FormContainer from "../../app/layouts/components/form/FormContainer";
// import FormTextInput from "../../app/layouts/components/form/FormTextInput";
// import FormSelectInput from "../../app/layouts/components/form/FormSelectInput";
// import FormDateInput from "../../app/layouts/components/form/FormDateInput";
// import { format } from "date-fns";
// // import { SlotStatus } from "../../app/models/slot";
// import TenantDetails from "./TenantDetails";
// import MainPage from "../../app/layouts/components/pages/MainPage";

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

    const { id, tenantId: routeTenantId } = useParams<{ id: string, tenantId: string }>();

    const [tenant, setTenant] = useState<ITenantInput>({
        id: "",
        firstName: "",
        lastName: "",
        companyName: "",
        address: "",
        contact: "",
        slotId: undefined,
        startDate: new Date(),
        endDate: new Date()
    })

    const { tenant: tenantData, isFetchingDetails } = useAppSelecter(state => state.tenant);
    const dispatch = useAppDispatch();

    const { tenants, isFetching: isFetchingTenants, isSaving } = useAppSelecter(state => state.tenant);

    // useEffect(() => {
    //     dispatch(fetchTenantsAsync());
    // }, [])

    useEffect(() => {
        if (id) dispatch(fetchTenantDetailsAsync(id));
    }, [id])

    // useEffect(() => {
    //     tenantData && setTenant(prev => {
    //         return {
    //             ...prev,
    //             fullName: tenantData.firstName,
    //             companyName: tenantData.companyName,
    //             address: tenantData.address,
    //             contact: tenantData.phone,
    //             slotId: !!tenantData.slotContract ? tenantData.slotContract.slot.id
    //         }
    //     });
    // }, [tenantData])

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required."),
        lastName: Yup.string().required("Last Name is required."),
        address: Yup.string().required("Address is required."),
        contact: Yup.string().required("Contact Number is required."),
        startDate: Yup.string().required("Start date is required."),
        endDate: Yup.string().required("End date is required."),
    })

    if (isFetchingDetails || isFetchingTenants) return (<LoadingComponent content="Loading tenants and slot..." />)

    const onSubmit = async (values: ITenantInput) => {
        if (!values.firstName)
            return;
        // await dispatch(createTenantsAsync({
        //     ...values,
        //     startDate: format(values.startDate, 'yyyy-MM-dd'),
        //     endDate: format(values.startDate, 'yyyy-MM-dd'),
        //     tenantId: values.tenantId ? ''
        // }));
        // history.push('/tenants')
    }

    return (
        <FormPage
            title={id ? "Update Tenant" : "New Tenant"}
            backNavigationLink={!id ? "/tenants" : `/tenants/${id}/details`}
            form={<></>}
        // children={
        //     <FormContainer
        //         title={id ? "Update Tenant" : "New Tenant"}
        //         children={
        //             <Formik
        //                 validationSchema={validationSchema}
        //                 enableReinitialize
        //                 initialValues={tenant}
        //                 onSubmit={values => {
        //                     onSubmit(values);
        //                 }}>
        //                 {
        //                     ({ handleSubmit, touched, isValid }) => (
        //                         <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >

        //                             <FormSelectInput
        //                                 options={tenants.filter(i => i.status === SlotStatus.Available).map(s => ({ text: s.slotNumber, value: s.id }))}
        //                                 name="slotId"
        //                                 placeholder="Slot Number"
        //                                 label="Slot Number"
        //                             />

        //                             <FormTextInput name="firstName" placeholder="First Name" label="First Name" />
        //                             <FormTextInput name="lastName" placeholder="Last Name" label="Last Name" />
        //                             <FormTextInput name="companyName" placeholder="Business Name" label="Business Name" />
        //                             <FormTextInput name="address" placeholder="Address" label="Address" />
        //                             <FormTextInput name="contact" placeholder="Contact Number" label="Contact Number" />
        //                             <FormDateInput name="startDate" placeholderText="Start date" label="Start Date" />
        //                             <FormDateInput name="endDate" placeholderText="End date" label="End Date" />

        //                             <div className="form__button-container py-3">
        //                                 <Button
        //                                     className="form__button"
        //                                     type="submit"
        //                                     content="Submit"
        //                                     color="orange"
        //                                     loading={isSaving}
        //                                 />
        //                             </div>
        //                         </Form>
        //                     )
        //                 }
        //             </Formik>
        //         }
        //     />
        // }
        />
    )
}

export default TenantForm;