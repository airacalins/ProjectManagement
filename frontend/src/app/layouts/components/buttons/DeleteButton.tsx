import React from 'react';
import { Button } from 'react-bootstrap';

import "./button.scss"

interface Props {
    navigateTo: string
}

const DeleteButton: React.FC<Props> = ({ navigateTo }) => {
    return (
        <Button className="btn-danger me-2" href={navigateTo}>
            Delete
        </Button>
    );
}

export default DeleteButton;