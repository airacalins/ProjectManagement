import React from 'react';
import { Button } from 'react-bootstrap';
import "./button.scss"

interface Props {
    title: string
    navigateTo: string
}

const NavigationButton: React.FC<Props> = ({ title, navigateTo }) => {
    return (
        <Button className="button__primary me-2" href={navigateTo}>
            {title}
        </Button>
    );
}

export default NavigationButton;