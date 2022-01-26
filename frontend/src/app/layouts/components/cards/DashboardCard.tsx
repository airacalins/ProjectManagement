import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './cards.scss'

interface Props {
    title: any
    subtitle: string
    icon: React.ReactNode
}

const DashboardCard: React.FC<Props> = ({ title, subtitle, icon }) => {
    return (
        <div className='dashboard-card__component d-flex align-items-center justify-content-between py-3 px-5 my-2' >
            <div>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>

            <div>
                {icon}
            </div>
        </div >
    );
}

export default DashboardCard;