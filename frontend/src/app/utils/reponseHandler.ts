import { toast } from 'react-toastify';

interface IProps {
  callback?: () => void;
  response: any;
}

const responseHandler = ({callback, response}: IProps) => {

  const { error, payload } = response;

  if(!error) {
    callback && callback();
  } else {
    toast.error(payload.error?.errorMessage ?? "An error occured");
  }
}

export default responseHandler;