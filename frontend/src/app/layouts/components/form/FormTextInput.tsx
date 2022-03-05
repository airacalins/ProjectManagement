import { useField } from "formik";
import { Col, FormLabel, Row } from "react-bootstrap";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string
    name: string
    label?: string
    type?: string
    inputFullWidth?: boolean
}

const FormTextInput = (props: Props) => {

    const [field, meta] = useField(props.name)

    return (
        <Row className="mb-3">
            <Col lg={2}>
                <FormLabel className="form__label">{props.label}</FormLabel>
            </Col>

            <Col>
                <Form.Field className={props.inputFullWidth ? "form__input-100" : "form__input"} error={meta.touched && !!meta.error}>
                    <input {...field} {...props} />
                </Form.Field>

                {
                    meta.touched && meta.error ?
                        (
                            <Label className="mb-3 p-0" basic color="red" style={{borderStyle: "none"}} >{meta.error}</Label>
                        ) :
                        null
                }
            </Col>
        </Row>
    );
}

export default FormTextInput;


