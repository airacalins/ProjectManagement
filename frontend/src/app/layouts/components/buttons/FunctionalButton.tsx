import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
    title: string;
    icon?: React.ReactNode;
    url?: string;
    onClick: () => void;
    color?: string;
    disabled?: boolean;
}

const FunctionalButton: React.FC<Props> = ({ disabled, color, onClick, icon, title, url }) => {

    if (!!url)
        return (
            <a href={url} target='_blank' >
                <Button className={`me-2 btn-${color}`} onClick={onClick}>
                    {icon && icon}
                    {title}
                </Button>
            </a>
        );

    return (
        <Button disabled={disabled} className={`me-2 btn-${color}`} onClick={onClick}>
            {icon && icon}
            {title}
        </Button>
    );


}

export default FunctionalButton;