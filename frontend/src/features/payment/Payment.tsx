import { useEffect } from "react";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import Tab from "../../app/layouts/components/tabs/Tab";
import TabItem from "../../app/layouts/components/tabs/TabItem";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchInvoicessAsync } from "./invoiceSlice";
import PaymentTable from "./PaymentTable";

const Payment = () => {

  
  const { invoices, isFetching } = useAppSelecter(state => state.invoice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInvoicessAsync());
  }, [])


  if (isFetching) return <LoadingComponent content="Loading invoices..." />

  return (
    <ContainerPage
      children={
        <>
          <PaymentTable invoices={invoices} />
        </>
      } />
  );
}

export default Payment;