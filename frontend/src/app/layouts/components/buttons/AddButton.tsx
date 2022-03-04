import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import "./button.scss"

interface Props {
    title?: string,
    loading?: boolean
    disabled: boolean,
    fullWidth?: boolean
}

const AddButton: React.FC<Props> = ({ title, loading, disabled, fullWidth }) => {
    return (

        <Button
            className={`button__primary ${fullWidth && "w-100"}`}
            type="submit"
            content={title ? title : "Submit"}
            loading={loading}
            disabled={disabled}
        />
    );
}

export default AddButton;