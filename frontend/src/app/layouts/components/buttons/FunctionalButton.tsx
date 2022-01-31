import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
    title: string,
    icon?: React.ReactNode;
    onClick: () => void;
}

const FunctionalButton: React.FC<Props> = ({ onClick, icon, title }) => {
    return (
        <Button className='me-2' onClick={onClick}>
            {icon && icon}
            {title}
        </Button>
    );
}

export default FunctionalButton;