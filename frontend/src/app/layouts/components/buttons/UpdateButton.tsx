import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import "./button.scss"

interface Props {
    navigateTo: string
}

const UpdateButton: React.FC<Props> = ({ navigateTo }) => {
    return (
        <Button className="button__primary me-2" href={navigateTo}>
            Update
        </Button>
    );
}

export default UpdateButton;