// import { Form, Formik } from "formik";
// import { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
// import FormTextInput from "../../app/layouts/components/form/FormTextInput";
// import FormPage from '../../app/layouts/components/pages/FormPage';
// import { IUpdateTenantInput } from "../../app/models/tenant";
// import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
// import history from "../../app/utils/history";
// import * as Yup from 'yup';
// import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";
// import AddButton from "../../app/layouts/components/buttons/AddButton";
// import { updateAnnouncementDetailsAsync } from "../announcement/announcementSlice";
// import { fetchTenantDetailsAsync } from "./tenantSlice";


// const TenantUpdateForm = () => {

//     const id = useParams<{ id: string }>();
//     const [tenant, setTenant] = useState<IUpdateTenantInput>({
//         firstName: "",
//         lastName: "",
//         businessName: "",
//         address: "",
//         contact: "",
//     })

//     const { isFetchingDetails, isSaving } = useAppSelecter(state => state.tenant);

//     const dispatch = useAppDispatch();

//     useEffect(() => {
//         if (!!id) dispatch(fetchTenantDetailsAsync(id));
//     }, [])

//     useEffect(() => { if (id) setTenant(tenant) })

//     const validationSchema = Yup.object({
//         firstName: Yup.string().required("First Name is required."),
//         lastName: Yup.string().required("Last Name is required."),
//         businessName: Yup.string().required("Business Name is required."),
//         address: Yup.string().required("Address is required."),
//         contact: Yup.string().required("Contact Number is required."),
//     })

//     onSubmit = async (values: any) => {
//         await dispatch(updateAnnouncementDetailsAsync(values))
//         history.push(`/tenants/${id}/details`)
//     }

//     return (
//         <FormPage
//             title="Update Tenant"
//             backNavigationLink="/tenants"
//             form={
//                 <Formik
//                     validationSchema={validationSchema}
//                     enableReinitialize
//                     initialValues={tenant}
//                     onSubmit={values => onSubmit(values)}
//                 >
//                     {
//                         ({ handleSubmit, isValid }) => (
//                             <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
//                                 <FormTextInput name="firstName" placeholder="First Name" label="First Name" />
//                                 <FormTextInput name="lastName" placeholder="Last Name" label="Last Name" />
//                                 <FormTextInput name="businessName" placeholder="Business Name" label="Business Name" />
//                                 <FormTextInput name="address" placeholder="Address" label="Address" />
//                                 <FormTextInput name="contact" placeholder="Contact Number" label="Contact Number" />

//                                 <FormButtonContainer>
//                                     <AddButton loading={isSaving} disabled={!isValid} />
//                                 </FormButtonContainer>
//                             </Form>
//                         )
//                     }
//                 </Formik>
//             }
//         />
//     );
// }

// export default TenantUpdateForm;

import React from 'react';

const TenantUpdateForm = () => {
    return (
        <>
        </>
    );
}

export default TenantUpdateForm;