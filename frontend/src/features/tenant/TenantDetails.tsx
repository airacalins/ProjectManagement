import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dateFormatter } from "../../app/layouts/formatter/common";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchTenantDetailsAsync, getTenantContractPhoto, uploadTenantContractPhoto } from "./tenantSlice";

import DetailItem from "../../app/layouts/components/items/DetailItem";
import DetailsPage from "../../app/layouts/components/pages/DetailsPage";
import FormButtonContainer from "../../app/layouts/components/form/FormButtonContainer";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import NavigationButton from "../../app/layouts/components/buttons/NavigationButton";
import CustomTable from "../../app/layouts/components/table/CustomTable";
import MainPage from "../../app/layouts/components/pages/MainPage";
import ImageUpload from "../../app/layouts/image-upload/ImageUpload";

const TenantDetails = () => {

    const { id } = useParams<{ id: string }>();

    const { tenant, isFetchingDetails, contractPhotos } = useAppSelecter(state => state.tenant);
    const dispatch = useAppDispatch();
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if(id) dispatch(fetchTenantDetailsAsync(id));
    }, [])

    

    useEffect(() => {
        if(tenant) dispatch(getTenantContractPhoto(tenant.contract?.id!));
    }, [tenant])

    if (isFetchingDetails || !tenant) return (<LoadingComponent content="Loading tenant..." />)

    const { businessName, firstName, lastName, address, phone, contract } = tenant

 
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }
 
  const upload = () => {
    files.forEach(async (file) => {
        await dispatch(uploadTenantContractPhoto({id: tenant.contract?.id!, file}))
        dispatch(getTenantContractPhoto(tenant.contract?.id!))
    })
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
                        <DetailItem title="Start Date" value={dateFormatter(contract?.startDate)} />
                        <DetailItem title="End Date" value={dateFormatter(contract?.endDate)} />
                        <DetailItem title="Amount" value={contract?.price} />
                        <DetailItem title="Contract" value="" />
                        <FormButtonContainer>
                            
                        <ImageUpload files={files} onDrop={onDrop}/>
                        <button onClick={() => upload()}>Upload</button>
                            <NavigationButton title="Terminate Contract" navigateTo="/" />
                        </FormButtonContainer>
                    </>
                }
            />


        </>
    );
}

export default TenantDetails;