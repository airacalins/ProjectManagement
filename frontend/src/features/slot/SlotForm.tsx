import { useEffect, useState } from "react";
import { Button, Message } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form } from "formik"
import * as Yup from 'yup';
import FormContainer from "../../app/layouts/components/form/FormContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { ISlot, SlotStatus } from "../../app/models/slot";
import { fetchSlotDetailsAsync, updateSlotDetailsAsync } from "./slotSlice";

const SlotForm = () => {
    const { id } = useParams<{ id: string }>();
    const [slot, setSlot] = useState<ISlot>({ id: "", slotNumber: "", size: 0, price: 0, status: SlotStatus.Available, tenantContract: undefined })

    const { slot: slotDetails, isFetchingDetails, isSaving } = useAppSelecter(state => state.slot);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) dispatch(fetchSlotDetailsAsync(id));
    }, [id])

    useEffect(() => {
        slotDetails && setSlot(slotDetails);
    }, [slotDetails])

    const validationSchema = Yup.object({
        slotNumber: Yup.string().required("Slot Number is required."),
        size: Yup.number().required("Size is required."),
        price: Yup.number().required("Rental Fee is required.")
    })

    if (isFetchingDetails) return (<LoadingComponent content="Loading slot..." />)

    const onSubmit = (values: any) => {
        if (id) dispatch(updateSlotDetailsAsync(values));
    }

    return (
        <FormContainer
            title={id ? "Update Slot" : "New Slot"}
            children={
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={slot}
                    onSubmit={values => onSubmit(values)}>
                    {
                        ({ handleSubmit }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >
                                {id && <Message
                                    content='Change in price will not affect any on going contract for this slot.'
                                />}
                                <FormTextInput name="slotNumber" placeholder="Slot Number" />
                                <FormTextInput name="size" placeholder="Size" />
                                <FormTextInput name="price" placeholder="Rental Fee" />

                                <div>
                                    <Button type="submit" content="Submit" color="orange" loading={isSaving} />
                                    <Button type="button" as={Link} to={!id ? "/slots" : `/slots/${slotDetails?.id}/details`} content="Cancel" disabled={isSaving || isFetchingDetails} />
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            }
        />

    )
}

export default SlotForm;