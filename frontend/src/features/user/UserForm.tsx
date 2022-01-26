import React from 'react';
import FormPage from '../../app/layouts/components/pages/FormPage';

interface Props {

}

const UserForm: React.FC<Props> = ({ }) => {
    return (
        <></>
        // <FormPage
        //     title=""
        //     backNavigationLink=""
        //     form={
        //         <Formik
        //             validationSchema={validationSchema}
        //             enableReinitialize
        //             initialValues={announcement}
        //             onSubmit={values => onSubmit(values)}>
        //             {
        //                 ({ handleSubmit, isValid }) => (
        //                     <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
        //                         <FormTextInput label="Subject" name="title" placeholder="Subject" />
        //                         <FormTextArea label="Message" name="message" placeholder="Message" rows={3} />
        //                         <FormButtonContainer>
        //                             <AddButton loading={isSaving} disabled={!isValid} />
        //                         </FormButtonContainer>
        //                     </Form>
        //                 )
        //             }
        //         </Formik>
        //     }
        // />
    );
}

export default UserForm;