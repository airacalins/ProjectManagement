import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotDetailsAsync, createSlotAsync, updateSlotDetailsAsync } from "./slotSlice";
import { useParams } from "react-router-dom";
import history from '../../app/utils/history';
import { Formik, Form } from "formik"
import * as Yup from 'yup';

import { Button, Message, Label } from "semantic-ui-react";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

import { ISlot, SlotStatus } from "../../app/models/slot";
import FormContainer from "../../app/layouts/components/form/FormContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import FormTextInput from "../../app/layouts/components/form/FormTextInput";
import MainPage from "../../app/layouts/components/pages/MainPage";
import FormPage from "../../app/layouts/components/pages/FormPage";
import { getSlotStatusColor, getSlotStatusText } from "../../app/utils/common";
import FormSelectInput from "../../app/layouts/components/form/FormSelectInput";
import { color } from "@mui/system";

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

    const handleResult = (data: any) => {
        if (!!data.error) {
            console.log('error')
        } else {
            history.push(`/slots/${!!id ? id : (data.payload as any).id}/details`)
        }
    }

    const onSubmit = async (values: any) => {
        if (id) {
            await dispatch(updateSlotDetailsAsync(values)).then(handleResult);
        } else {
            await dispatch(createSlotAsync(values)).then(handleResult);
        }
    }

    const slotStatusOptions = [
        { text: getSlotStatusText(SlotStatus.Available), value: SlotStatus.Available },
        { text: getSlotStatusText(SlotStatus.Reserved), value: SlotStatus.Reserved },
        { text: getSlotStatusText(SlotStatus.UnderMaintenance), value: SlotStatus.UnderMaintenance },
        { text: getSlotStatusText(SlotStatus.Archived), value: SlotStatus.Archived }
    ]
    return (
        <FormPage
            title={id ? "Update Slot" : "New Slot"}
            backNavigationLink={!id ? "/slots" : `/slots/${slotDetails?.id}/details`}
            form={
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
                                {!!id && slot.status != SlotStatus.Rented && <FormSelectInput
                                    options={slotStatusOptions}
                                    name="status"
                                    placeholder="Slot status"
                                    label="Status"
                                />}
                                {!!id && slot.status === SlotStatus.Rented &&
                                    <Label content={getSlotStatusText(SlotStatus.Rented)} color={getSlotStatusColor(SlotStatus.Rented)}></Label>
                                }
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
                // <FormContainer
                //     title={id ? "Update Slot" : "New Slot"}
                //     children={
                //         <Formik
                //             validationSchema={validationSchema}
                //             enableReinitialize
                //             initialValues={slot}
                //             onSubmit={values => onSubmit(values)}>
                //             {
                //                 ({ handleSubmit }) => (
                //                     <Form className="ui form" onSubmit={handleSubmit} autoComplete="off" >

                //                         {id && <Message
                //                             content='Change in price will not affect any on going contract for this slot.'
                //                         />}

                //                         <FormTextInput label="Slot Number" name="slotNumber" placeholder="Slot Number" />
                //                         <FormTextInput label="Size" name="size" placeholder="Size" />
                //                         <FormTextInput label="Rental Fee" name="price" placeholder="Rental Fee" />

                //                         <div className="form__button-container py-3">
                //                             <Button
                //                                 className="form__button"
                //                                 type="submit"
                //                                 content="Submit"
                //                                 color="orange"
                //                                 loading={isSaving}
                //                             />
                //                         </div>

                //                     </Form>
                //                 )
                //             }
                //         </Formik>
                //     }
                // />
            }
        />
    )
}

export default SlotForm;