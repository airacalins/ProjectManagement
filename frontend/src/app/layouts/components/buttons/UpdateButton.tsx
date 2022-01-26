import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button, SemanticCOLORS } from 'semantic-ui-react';
import "./button.scss"

interface Props {
    title: string,
    loading?: boolean
    disabled?: boolean,
    color: SemanticCOLORS,
    onClick: () => void,
}

const UpdateButton: React.FC<Props> = ({ title, loading, disabled, color, onClick }) => {
    return (

        <Button
            className="button__primary"
            content={title}
            loading={loading}
            disabled={disabled}
            color={color}
            onClick={onClick}
        />

    );
}

export default UpdateButton;