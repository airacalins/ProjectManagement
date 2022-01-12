import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Slot } from "../../app/models/slot";
import { Formik, Form } from "formik"
import * as Yup from 'yup';
import FormContainer from "../../app/layouts/components/form/FormContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";

const SlotForm = () => {

    const { slotStore } = useStore();
    const { loadSlot, initialLoading, selectedSlot } = slotStore;
    const { id } = useParams<{ id: string }>();
    const [slot, setSlot] = useState<Slot>({ id: 0, slotNumber: "", size: 0, price: 0, slotStatus: 0, tenantContract: undefined })

    const validationSchema = Yup.object({
        slotNumber: Yup.string().required("Slot Number is required."),
        size: Yup.number().required("Size is required."),
        price: Yup.number().required("Rental Fee is required.")
    })

    useEffect(() => {
        if (id) loadSlot(+id).then(() => setSlot(selectedSlot!))
    }, [id, loadSlot, selectedSlot])

    if (initialLoading) return (<LoadingComponent content="Loading slot..." />)

    return (
        <FormContainer
            title={id ? "Update Slot" : "New Slot"}
            children={
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={slot}
                    onSubmit={values => console.log(values)}>
                    {
                        ({ handleSubmit }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                <FormTextInput name="slotNumber" placeholder="Slot Number" />
                                <FormTextInput name="size" placeholder="Size" />
                                <FormTextInput name="price" placeholder="Rental Fee" />

                                <div>
                                    <Button type="submit" content="Submit" color="orange" />
                                    <Button type="button" as={Link} to={!id ? "/slots" : `/slots/${selectedSlot?.id}/details`} content="Cancel" />
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            }
        />

    )
}

export default observer(SlotForm);