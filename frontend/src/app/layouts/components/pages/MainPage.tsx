import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import './mainPage.scss'

interface Props {
    title: string,
    buttonTitle?: string
    content?: React.ReactNode
}

const MainPage: React.FC<Props> = ({ title, buttonTitle, content }) => {
    return (
        <div>
            <h4 className="main-page d-flex align-items-center px-4">{title}</h4>

            <div className="px-5">
                <Row className="d-flex align-items-center justify-content-between py-4" md={4}>
                    <Col className="d-flex align-items-center p-0" >
                        <Form.Control type="email" placeholder="Search..." />
                    </Col>

                    {buttonTitle ?
                        <Col className="d-flex justify-content-end" md={{ span: 2, offset: 6 }}>
                            <Button className="d-flex align-item-center main-page__button">
                                <AddOutlinedIcon className='me-2' />
                                {buttonTitle}
                            </Button>
                        </Col>
                        :
                        <></>}
                </Row>
                {content}
            </div>
        </div>
    );
}

export default MainPage;