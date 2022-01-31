import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './item.scss'

interface Props {
    title: string,
    value: any,
    rightText?: boolean
}

const DetailItem: React.FC<Props> = ({ title, value, rightText }) => {
    return (
        <Row className="my-3">
            <Col className="item__title" lg={!!rightText ? 9 : 3}>{title}</Col>
            <Col>{value}</Col>
        </Row>
    );
}

export default DetailItem;