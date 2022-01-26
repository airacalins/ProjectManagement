import { useField, useFormikContext } from "formik";
import { Col, FormLabel, Row } from "react-bootstrap";
import { Label } from "semantic-ui-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './form.scss'

interface Props {
    placeholderText: string
    name: string
    label?: string
}

const FormDateInput = (props: Props) => {
    const { setFieldValue } = useFormikContext();

    const [field, meta] = useField(props.name)

    return (
        <Row className="mb-3">
            <Col lg={2}>
                <FormLabel className="form__label">{props.label}</FormLabel>
            </Col>

            <Col>
                <DatePicker
                    className="date-input__date"
                    {...field}
                    {...props}
                    selected={(field.value && new Date(field.value)) || null}
                    onChange={value => setFieldValue(field.name, value)}
                    dateFormat={"MMMM d, yyyy"}
                />

                {
                    meta.touched && meta.error ?
                        (
                            <Label className="my-1" basic color="red">{meta.error}</Label>
                        ) :
                        null
                }
            </Col>
        </Row>
    );
}

export default FormDateInput;


