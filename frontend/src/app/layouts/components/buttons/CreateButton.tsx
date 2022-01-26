import React from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button } from 'react-bootstrap';

import "./button.scss"

interface Props {
    title: string
    navigateTo: string
}

const CreateButton: React.FC<Props> = ({ title, navigateTo }) => {
    return (
        <Button className="button__primary d-flex align-items-center me-2" href={navigateTo}>
            <AddOutlinedIcon className='me-2' />
            {title}
        </Button>
    );
}

export default CreateButton;