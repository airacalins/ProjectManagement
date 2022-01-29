import { useField } from "formik";
import { Col, FormLabel, Row } from "react-bootstrap";
import { Label, Select } from "semantic-ui-react";
import "./form.scss"

interface Props {
    placeholder: string
    name: string
    options: any
    label?: string
    formLabel?: string
}

const FormSelectInput = (props: Props) => {

    const [field, meta, helpers] = useField(props.name)

    return (
        <Row className="mb-3">
            <Col lg={2}>
                <FormLabel className="form__label">{props.label}</FormLabel>
            </Col>

            <Col>
                <Select
                    className="form__input"
                    name={props.name}
                    clearable
                    options={props.options}
                    value={!!field.value ||  field.value === 0 ? field.value : null}
                    onChange={(e, d) => helpers.setValue(d.value)}
                    onBlur={() => helpers.setTouched(true)}
                    placeholder={props.placeholder}
                />

                {
                    meta.touched && meta.error ?
                        (
                            <Label basic color="red">{meta.error}</Label>
                        ) :
                        null
                }
            </Col>
        </Row>
    );
}

export default FormSelectInput;


