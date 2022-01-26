import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import "./button.scss"

interface Props {
    loading: boolean
    disabled: boolean,
}

const AddButton: React.FC<Props> = ({ loading, disabled }) => {
    return (

        <Button
            className="button__primary"
            type="submit"
            content="Submit"
            loading={loading}
            disabled={disabled}
        />

    );
}

export default AddButton;