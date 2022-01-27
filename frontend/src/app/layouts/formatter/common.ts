import moment from 'moment';

export const currencyFormatter = (amount: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};

export const dateFormatter = (date: string | undefined) => {
  return !!date ? moment(date).format('MMM DD, YYYY') : "-----";
};
