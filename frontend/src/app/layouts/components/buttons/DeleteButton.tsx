import React from 'react';
import { Button } from 'react-bootstrap';

import "./button.scss"

interface Props {
    onClick: () => void
}

const DeleteButton: React.FC<Props> = ({ onClick }) => {
    return (
        <Button className="btn-danger me-2" onClick={onClick}>
            Delete
        </Button>
    );
}

export default DeleteButton;