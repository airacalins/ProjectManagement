import React from 'react';
import { Button } from 'semantic-ui-react';

import "./button.scss"

interface Props {
    onClick: () => void
    loading: boolean
}

const DeleteButton: React.FC<Props> = ({ onClick, loading }) => {
    return (
        <Button className="btn-danger me-2" color='red' onClick={onClick} loading={loading} disabled={loading}>
            Delete
        </Button>
    );
}

export default DeleteButton;