import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

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