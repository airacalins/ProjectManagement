import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';

interface Props {
    loading: boolean
    disabled: boolean,
}

const FormButton: React.FC<Props> = ({ loading, disabled }) => {
    return (
        <Row className='py-3'>
            <Col lg={2}></Col>

            <Col>
                <Button type="submit" content="Submit" color="orange" loading={loading} disabled={disabled} />
            </Col>
        </Row>
    );
}

export default FormButton;