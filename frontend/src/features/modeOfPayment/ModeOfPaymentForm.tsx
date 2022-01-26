import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IModeOfPayment } from "../../app/models/modeOfPayment";
import * as Yup from 'yup';
import FormContainer from "../../app/layouts/components/form/FormContainer";
import { Form, Formik } from "formik";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import { Button } from "semantic-ui-react";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { createModeOfPaymentAsync, fetchModeOfPaymentDetailsAsync } from "./modeOfPaymentSlice";
import history from '../../app/utils/history';
import FormPage from "../../app/layouts/components/pages/FormPage";
import FormButton from "../../app/layouts/components/buttons/AddButton";
import FormAddButton from "../../app/layouts/components/buttons/AddButton";
import AddButton from "../../app/layouts/components/buttons/AddButton";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";


const ModeOfPaymentForm = () => {

    const [modeOfPayment, setModefPayment] = useState<IModeOfPayment>({
        id: "",
        bankName: "",
        accountName: "",
        accountNumber: "",
        isEnabled: true
    })

    const { modeOfPayment: modeOfPaymentData, isFetchingDetails, isSaving } = useAppSelecter(state => state.modeOfPayment);
    const dispatch = useAppDispatch();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) dispatch(fetchModeOfPaymentDetailsAsync(id));
    }, [id])

    useEffect(() => {
        if (id && modeOfPaymentData) setModefPayment(modeOfPaymentData)
    }, [id, modeOfPayment])

    const validationSchema = Yup.object({
        bankName: Yup.string().required("Bank name is required."),
        accountName: Yup.string().required("Account name is required."),
        accountNumber: Yup.string().required("Account number is required."),
    })


    const onSubmit = async (values: any) => {
        if (!!values.bankName) {
            await dispatch(createModeOfPaymentAsync(values));
            history.push('/mode-of-payments')
        };
    }

    if (isFetchingDetails) return (<LoadingComponent content="Loading mode of payments..." />)

    return (
        <FormPage
            title={id ? "Update Mode of Payment" : "Add Mode of Payment"}
            backNavigationLink={id ? `/mode-of-payments/${id}/details` : "/mode-of-payments"}
            form={
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={modeOfPayment}
                    onSubmit={values => onSubmit(values)}>
                    {
                        ({ handleSubmit, isValid }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                <FormTextInput label="Bank Name" name="bankName" placeholder="Bank Name" />
                                <FormTextInput label="Account Name" name="accountName" placeholder="Accounnt Name" />
                                <FormTextInput label="Account Number" name="accountNumber" placeholder="Account Number" />
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

export default ModeOfPaymentForm;