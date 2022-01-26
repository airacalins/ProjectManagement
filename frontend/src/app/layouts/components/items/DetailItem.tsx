import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './item.scss'

interface Props {
    title: string,
    value: any
}

const DetailItem: React.FC<Props> = ({ title, value }) => {
    return (
        <Row className="my-3">
            <Col className="item__title" lg={2}>{title}</Col>
            <Col>{value}</Col>
        </Row>
    );
}

export default DetailItem;