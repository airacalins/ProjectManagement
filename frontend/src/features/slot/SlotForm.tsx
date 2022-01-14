import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form } from "formik"
import * as Yup from 'yup';
import FormContainer from "../../app/layouts/components/form/FormContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { ISlot } from "../../app/models/slot";
import { fetchSlotDetailsAsync } from "./slotSlice";

const SlotForm = () => {
    const { id } = useParams<{ id: string }>();
    const [slot, setSlot] = useState<ISlot>({ id: "", slotNumber: "", size: 0, price: 0, slotStatus: 0, tenantContract: undefined })

    const { slot: slotDetails, isFetchingDetails } = useAppSelecter(state => state.slot);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(id) dispatch(fetchSlotDetailsAsync(id));
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
                                    <Button type="button" as={Link} to={!id ? "/slots" : `/slots/${slotDetails?.id}/details`} content="Cancel" />
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