import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchTenantsAsync } from "./tenantSlice";

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import TenantTable from "./TenantTable";

const Tenant = () => {

    const [searchKey, setSearchKey] = useState('');
    const { tenants, isFetching: isFetchingTenants } = useAppSelecter(state => state.tenant);
    const dispatch = useAppDispatch();

    const data = useMemo(() => {
        if (!!searchKey) {
            return tenants.filter(i => i.firstName.toLowerCase().includes(searchKey.toLowerCase()));
        }
        return tenants;
    }, [tenants, searchKey])

    useEffect(() => {
        dispatch(fetchTenantsAsync());
    }, [])

    if (isFetchingTenants) return <LoadingComponent content="Loading Tenants..." />

    return (
        <MainPage
            title="Tenants"
            content={<TenantTable tenants={data} />}
            searchValue={searchKey}
            onSearch={(value: string) => setSearchKey(value)}
            buttonTitle="Add Tenant"
            navigateTo="/tenants/create"
        />
    );
}

export default Tenant;