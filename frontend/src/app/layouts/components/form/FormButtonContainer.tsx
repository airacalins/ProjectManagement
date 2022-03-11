import React from 'react';
import { Col, Row } from 'react-bootstrap';

interface Props {
    children: React.ReactNode
}

const FormButtonContainer: React.FC<Props> = ({ children }) => {
    return (
        <Row className='py-3'>
            <Col lg={2}></Col>

            <Col>
                {children}
            </Col>
        </Row>


    );
}

export default FormButtonContainer;