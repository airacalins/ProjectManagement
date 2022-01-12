import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ModeOfPayment } from "../../app/models/modeOfPayment";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import FormContainer from "../../app/layouts/components/form/FormContainer";
import { Form, Formik } from "formik";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import { Button } from "semantic-ui-react";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";


const ModeOfPaymentForm = () => {
    const { modeOfPaymentStore } = useStore();
    const { loadModeOfPayment, initialLoading, selectedModeOfPayment } = modeOfPaymentStore;
    const { id } = useParams<{ id: string }>();
    const [modeOfPayment, setModefPayment] = useState<ModeOfPayment>({ id: 0, bankName: "", accountName: "", accountNumber: "" })

    const validationSchema = Yup.object({
        bankName: Yup.string().required("Bank name is required."),
        accountName: Yup.string().required("Account name is required."),
        accountNumber: Yup.string().required("Account number is required."),
    })

    useEffect(() => {
        if (id) loadModeOfPayment(+id).then(() => setModefPayment(selectedModeOfPayment!))
    }, [id, loadModeOfPayment, selectedModeOfPayment])

    if (initialLoading) return (<LoadingComponent content="Loading mode of payments..." />)


    return (
        <FormContainer
            title="Mode of Payment"
            children={
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={modeOfPayment}
                    onSubmit={values => console.log(values)}>
                    {
                        ({ handleSubmit }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                <FormTextInput name="bankName" placeholder="Bank Name" />
                                <FormTextInput name="accountName" placeholder="Accounnt Name" />
                                <FormTextInput name="accountNumber" placeholder="Account Number" />

                                <div>
                                    <Button type="submit" content="Submit" color="orange" />
                                    <Button type="button" as={Link} to={id ? `/mode-of-payment/${selectedModeOfPayment?.id}/details` : "/mode-of-payments"} content="Cancel" />
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            }
        />
    )
}

export default ModeOfPaymentForm;