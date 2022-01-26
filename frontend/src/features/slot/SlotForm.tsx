import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotDetailsAsync, createSlotAsync, updateSlotDetailsAsync } from "./slotSlice";
import { useParams } from "react-router-dom";
import history from '../../app/utils/history';
import { Formik, Form } from "formik"
import * as Yup from 'yup';

import { Button, Message } from "semantic-ui-react";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

import { ISlot, SlotStatus } from "../../app/models/slot";
import FormContainer from "../../app/layouts/components/form/FormContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import MainPage from "../../app/layouts/components/pages/MainPage";
import FormPage from "../../app/layouts/components/pages/FormPage";

const SlotForm = () => {
    const { id } = useParams<{ id: string }>();

    const [slot, setSlot] = useState<ISlot>({
        id: "",
        slotNumber: "",
        size: 0,
        price: 0,
        status: SlotStatus.Available,
        tenantContract: undefined
    })

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

    const onSubmit = async (values: any) => {
        await dispatch(createSlotAsync(values));
        history.push('/slots')
        if (id) dispatch(updateSlotDetailsAsync(values));
    }

    return (
        <FormPage
            backNavigationLink={!id ? "/slots" : `/slots/${slotDetails?.id}/details`}
            form={
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

                                        <FormTextInput label="Slot Number" name="slotNumber" placeholder="Slot Number" />
                                        <FormTextInput label="Size" name="size" placeholder="Size" />
                                        <FormTextInput label="Rental Fee" name="price" placeholder="Rental Fee" />

                                        <div className="form__button-container py-3">
                                            <Button
                                                className="form__button"
                                                type="submit"
                                                content="Submit"
                                                color="orange"
                                                loading={isSaving}
                                            />
                                        </div>

                                    </Form>
                                )
                            }
                        </Formik>
                    }
                />
            }
        />
    )
}

export default SlotForm;