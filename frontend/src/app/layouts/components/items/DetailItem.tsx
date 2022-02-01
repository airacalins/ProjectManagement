import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './item.scss'

interface Props {
    title: string,
    value: any,
    space?: number
}

const DetailItem: React.FC<Props> = ({ title, value, space }) => {
    return (
        <Row className="my-3">
            <Col className="item__title" lg={!!space ? space : 2}>{title}</Col>

            {/* <Col className="item__title" lg={!!rightText ? 9 : 3}>{title}</Col> */}

            <Col>{value}</Col>
        </Row>
    );
}

export default DetailItem;