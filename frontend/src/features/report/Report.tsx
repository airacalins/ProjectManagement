import moment from 'moment';
import { useState } from 'react';
import FormDateInput from '../../app/layouts/components/form/FormDateInput';
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import MainPage from '../../app/layouts/components/pages/MainPage';
import AddButton from '../../app/layouts/components/buttons/AddButton';
import FormButtonContainer from '../../app/layouts/components/form/FormButtonContainer';
import { IDateDurationInput } from '../../app/models/report';

const Report = () => {
    const [dateDuration, setDateDuration] = useState<IDateDurationInput>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const validationSchema = Yup.object({
        startDate: Yup.string().required("Start date is required"),
        endDate: Yup.string().required("Start date is required"),
    })

    // onSubmit = async (values: IDateDurationInput) => {
    //     dispatch
    // }


    return (
        // <MainPage
        //     title="Reports"
        //     content={
        //         <Formik
        //             validationSchema={validationSchema}
        //             enableReinitialize
        //             initialValues={dateDuration}
        //             onSubmit={values => onSubmit(values)}>
        //             {
        //                 ({ handleSubmit, isValid }) => (
        //                     <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >

        //                         <FormDateInput name="Form" placeholderText='startDate' label="Start Date" />
        //                         <FormDateInput name="To" placeholderText='startDate' label="Start Date" />

        //                         <FormButtonContainer>
        //                             <AddButton loading={isSaving} disabled={!isValid} />
        //                         </FormButtonContainer>
        //                     </Form>
        //                 )
        //             }
        //         </Formik>
        //     }
        // />
        <></>
    );
}

export default Report;

