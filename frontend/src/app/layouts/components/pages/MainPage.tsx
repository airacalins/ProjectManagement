import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

interface Props {
    title: string,
    buttonTitle: string
    content?: React.ReactNode
}

const MainPage: React.FC<Props> = ({ title, buttonTitle, content }) => {
    return (
        <div>
            <h4 className="page__title d-flex align-items-center px-4">{title}</h4>

            <div className="px-5">
                <Row className="d-flex align-items-center justify-content-between py-4" md={4}>
                    <Col className="d-flex align-items-center p-0" >
                        <Form.Control className="page__form" type="email" placeholder="Search..." />
                    </Col>

                    <Col className="d-flex justify-content-end" md={{ span: 2, offset: 6 }}>
                        <Button className="w-50">{buttonTitle}</Button>
                    </Col>
                </Row>

                {content}
            </div>
        </div>
    );
}

export default MainPage;