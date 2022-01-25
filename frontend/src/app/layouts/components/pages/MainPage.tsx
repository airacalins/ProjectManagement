import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import './mainPage.scss'

interface Props {
    title: string,
    content?: React.ReactNode,
}

const MainPage: React.FC<Props> = ({ title, content }) => {
    return (
        <div>
            <h4 className="main-page d-flex align-items-center px-4">{title}</h4>

            <div className="px-5 pb-5">
                {content}
            </div>

        </div>
    );
}

export default MainPage;