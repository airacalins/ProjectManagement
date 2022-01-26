import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './page.scss'

interface Props {
    title: string,
    content?: React.ReactNode,
}

const MainPage: React.FC<Props> = ({ title, content }) => {
    return (
        <div>
            {
                <h4 className="main-page d-flex align-items-center px-4 mb-3">{title}</h4>
            }
            <div className="pb-5">
                {content}
            </div>

        </div >
    );
}

export default MainPage;