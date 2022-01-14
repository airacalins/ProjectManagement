import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import PaymentTable from "./PaymentTable";

const Payment = () => {

  // const { initialLoading, loadTenantPayments } = tenantPaymantStore;

  // useEffect(() => {
  //     loadTenantPayments()
  // }, [loadTenantPayments])

  // if (initialLoading) return <LoadingComponent content="Loading payments..." />

  return (
    <ContainerPage
      children={
        <>
          <Tab>
            <TabItem name="All" navigateTo="./tenant" />
            <TabItem name="Updated" navigateTo="./slot/updated" />
            <TabItem name="Delayed" navigateTo="./slot/delayed" />
          </Tab>

          <PaymentTable />
        </>
      } />
  );
}

export default Payment;