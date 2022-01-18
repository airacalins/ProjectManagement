import { useField, useFormikContext } from "formik";
import { Form, Label, Placeholder, Select } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
    placeholderText: string
    name: string
    label?: string
}

const FormDateInput = (props: Props) => {
  const {setFieldValue} = useFormikContext();

    const [field, meta] = useField(props.name)

    return (

        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>

            <DatePicker
              {...field}
              {...props}
              selected={(field.value && new Date(field.value)) || null}
              onChange={value => setFieldValue(field.name, value)}
              dateFormat={"MMMM d, yyyy"}
            />

            {
                meta.touched && meta.error ?
                    (
                        <Label basic color="red">{meta.error}</Label>
                    ) :
                    null
            }
        </Form.Field>
    );
}

export default FormDateInput;


