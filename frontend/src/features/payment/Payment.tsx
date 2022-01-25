import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchInvoicessAsync } from "./invoiceSlice";

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import PaymentTable from "./PaymentTable";

const Payment = () => {
  const [searchKey, setSearchKey] = useState('');
  const { invoices, isFetching: isFetchingPayments } = useAppSelecter(state => state.invoice);
  const dispatch = useAppDispatch();

  // const data = useMemo(() => {
  //   if (!!searchKey) {
  //     return invoices.filter(i => i.slotNumber.toLowerCase().includes(searchKey.toLowerCase()));
  //   }
  //   return slots;
  // }, [slots, searchKey])

  // useEffect(() => {
  //   dispatch(fetchSlotsAsync());
  // }, [])

  // useEffect(() => {
  //   dispatch(fetchInvoicessAsync());
  // }, [])


  // if (isFetching) return <LoadingComponent content="Loading invoices..." />

  return (
    <MainPage
      title="Payments"
      content={<PaymentTable invoices={invoices} />}
    // searchValue={searchKey}
    // onSearch={(value: string) => setSearchKey(value)}
    // buttonTitle="Add Slot"
    // navigateTo="/slots/create"
    />
    // <ContainerPage
    //   children={
    //     <>
    //       <PaymentTable invoices={invoices} />
    //     </>
    //   } />
  );
}

export default Payment;