import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchInvoicessAsync } from "./invoiceSlice";
import history from '../../app/utils/history';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import CustomTable from "../../app/layouts/components/table/CustomTable";
import { IInvoice, PaymentStatus } from "../../app/models/invoice";
import { getPaymentStatusText } from "../../app/utils/common";
import moment from "moment";
import { Label } from "semantic-ui-react";

const Payment = () => {
  const [searchKey, setSearchKey] = useState('');
  const { invoices, isFetching: isFetchingPayments } = useAppSelecter(state => state.invoice);

  const dispatch = useAppDispatch();

  const data = useMemo(() => {
    if (!!searchKey) {
      return invoices.filter(i => i.slotNumber.toLowerCase().includes(searchKey.toLowerCase()));
    }
    return invoices;
  }, [invoices, searchKey])

  useEffect(() => {
    dispatch(fetchInvoicessAsync());
  }, [])

  const renderPaymentDetails = (invoice: IInvoice) => {
    if (invoice.payments != null && invoice.payments.length > 0 && invoice.payments.some(i => i.status === PaymentStatus.Approved)) {
      const approvedPayment = invoice.payments.filter(i => i.status === PaymentStatus.Approved)[0];
      return approvedPayment.bankName;
    }

    return "-----"
  };


  const renderPaymentStatusText = (invoice: IInvoice) => {
    if (invoice.payments != null && invoice.payments.length > 0 && invoice.payments.some(i => i.status === PaymentStatus.Approved)) {
      const approvedPayment = invoice.payments.filter(i => i.status === PaymentStatus.Approved)[0];
      return getPaymentStatusText(approvedPayment.status);
    }

    return "Unpaid"
  };

  const columns = [
    { title: 'Tenant' },
    { title: 'Slot Number' },
    { title: 'Rental Fee' },
    { title: 'Due Date' },
    { title: 'Status' },
    { title: '' },
  ]

  if (isFetchingPayments) return <LoadingComponent content="Loading invoices..." />

  return (
    <MainPage
      title="Payments"
      content={
        <CustomTable
          columns={columns}
          rows=
          {
            invoices.map(i => <TableRow key={i.id}>

              <TableCell align="center">
                {`${i.firstName} ${i.lastName}`}
              </TableCell>

              <TableCell align="center">
                {i.slotNumber}
              </TableCell>

              <TableCell align="center">
                {i.amount}
              </TableCell>

              <TableCell align="center">
                {moment(i.dueDate).format("MMM Do YY")}
              </TableCell>

              <TableCell align="center">
                <Label content={renderPaymentStatusText(i)} badgeColor="red" />
              </TableCell>

              <TableCell align="right">
                <NavigateNextOutlinedIcon onClick={() => history.push(`/payments/${i.id}/details`)} />
              </TableCell>

            </TableRow>
            )
          }
          searchValue={searchKey}
          onSearch={(value: string) => setSearchKey(value)}
        />
      }
    />
  );
}

export default Payment;