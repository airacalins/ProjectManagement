import React from 'react';
import './page.scss'

interface Props {
    title: string,
    content?: React.ReactNode,
}

const MainPage: React.FC<Props> = ({ title, content }) => {
    return (
        <div className="mb-5">
            <h4 className="page__title w-100 d-flex align-items-center px-4">{title}</h4>

            <div className="page__container px-5 py-4 mx-5" >
                {content}
            </div>
        </div >
    );
}

export default MainPage;