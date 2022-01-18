import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string
    name: string
    label?: string
}

const FormTextInput = (props: Props) => {

    const [field, meta] = useField(props.name)

    return (

        <Form.Field error={meta.touched && !!meta.error}>
            {
                meta.touched && <label className="label dark-gray">{props.label}</label>
            }

            <input {...field} {...props} />

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

export default FormTextInput;


