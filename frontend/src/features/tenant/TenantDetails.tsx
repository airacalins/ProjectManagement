import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dateFormatter } from "../../app/layouts/formatter/common";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { deleteTenantContractPhoto, fetchTenantDetailsAsync, getTenantContractPhoto, terminateTenantContract, uploadTenantContractPhoto } from "./tenantSlice";

import DetailItem from "../../app/layouts/components/items/DetailItem";
import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import NavigationButton from "../../app/layouts/components/buttons/NavigationButton";
import ImageUpload from "../../app/layouts/image-upload/ImageUpload";
import FunctionalButton from "../../app/layouts/components/buttons/FunctionalButton";
import ImageFullWidth from "../../app/layouts/components/images/ImageFullWidth";
import DeleteButton from "../../app/layouts/components/buttons/DeleteButton";
import ImageThumbnail from "../../app/layouts/components/images/ImageThumbnail";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import history from "../../app/utils/history";

const TenantDetails = () => {

    const { id } = useParams<{ id: string }>();

    const { tenant, isFetchingDetails, contractPhotos, isSaving, isFetchingPhotos } = useAppSelecter(state => state.tenant);
    const dispatch = useAppDispatch();
    const [files, setFiles] = useState<File[]>([]);
    const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);

    useEffect(() => {
        if (id) dispatch(fetchTenantDetailsAsync(id));
    }, [])

    useEffect(() => {
        if (tenant) dispatch(getTenantContractPhoto(tenant.contract?.id!));
    }, [tenant])

    if (isFetchingDetails || !tenant || isSaving) return (<LoadingComponent content="Loading tenant..." />)

    const { businessName, firstName, lastName, address, phone, contract } = tenant

    const onDrop = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }

    const handleDeleteContractPhoto = async (id: string) => {
        setIsLoadingPhotos(true);
        await dispatch(deleteTenantContractPhoto(id))
            .then(() => dispatch(getTenantContractPhoto(tenant.contract?.id!)))
        setIsLoadingPhotos(false);
    }

    const upload = async () => {
        setIsLoadingPhotos(true);
        files.forEach(async (file) => {
            dispatch(uploadTenantContractPhoto({ id: tenant.contract?.id!, file }))
                .then(() => dispatch(getTenantContractPhoto(tenant.contract?.id!)))
        })
        setIsLoadingPhotos(false);
        setFiles([]);
    }

    const handleTerminateTenantContract = async (id: string) => {
        await dispatch(terminateTenantContract(id))
        history.push('/tenants')
    }

    return (
        <>
            <DetailsPage
                title="Personal Information"
                backNavigationLink="/tenants"
                content={
                    <>
                        <DetailItem title="Business Name" value={businessName} />
                        <DetailItem title="First Name" value={firstName} />
                        <DetailItem title="Last Name" value={lastName} />
                        <DetailItem title="Address" value={address} />
                        <DetailItem title="Contact Number" value={phone} />

                        <FormButtonContainer>
                            <NavigationButton title="Edit" navigateTo={`/tenants/${id}/manage`} />
                        </FormButtonContainer>
                    </>
                }
            />

            <DetailsPage
                title="Contract"
                content={
                    <>
                        <DetailItem title="Slot Number" value={contract?.slotNumber} />
                        <DetailItem title="Start Date" value={dateFormatter(contract?.startDate)} />
                        <DetailItem title="End Date" value={dateFormatter(contract?.endDate)} />
                        <DetailItem title="Amount" value={contract?.price} />
                        {
                            isLoadingPhotos ? <>Loading contracts...</>
                                : <DetailItem title="Contract" value={
                                    contractPhotos && contractPhotos.map(i =>
                                        <Row className="mb-3 align-items-center ">
                                            <Col lg={9}>
                                                <p>Uploaded on {moment(i.dateCreated).format('YYYY, MMM DD')}</p>
                                                <ImageThumbnail url={i.url} />
                                            </Col>

                                            <Col>
                                                <FunctionalButton url={i.url} title="View Image" onClick={() => { }} />
                                                <DeleteButton onClick={() => { handleDeleteContractPhoto(i.id) }} loading={isSaving} />
                                            </Col>
                                        </Row>
                                    )
                                } />
                        }
                        <FormButtonContainer>
                            <ImageUpload files={files} onDrop={onDrop} />
                            <FunctionalButton title="Upload" onClick={() => upload()} disabled={!files || files.length < 1} />
                            <FunctionalButton title="Clear" color="danger" onClick={() => setFiles([])} disabled={!files || files.length < 1} />
                        </FormButtonContainer>

                        <Row className="my-5">
                            <Col className="offset-lg-10">
                                <FunctionalButton title="Terminate Contract" color="danger" onClick={() => { handleTerminateTenantContract(id!) }} />
                            </Col>
                        </Row>
                    </>
                }
            />


        </>
    );
}

export default TenantDetails;