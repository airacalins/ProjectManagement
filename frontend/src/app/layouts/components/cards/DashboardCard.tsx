import React from 'react';
import { NavLink } from 'react-bootstrap';
import './cards.scss'

interface Props {
    title: any
    subtitle: string
    icon: React.ReactNode
    navigateTo: string
}

const DashboardCard: React.FC<Props> = ({ title, subtitle, icon, navigateTo }) => {
    return (
        <NavLink href={navigateTo} className='dashboard-card__component border d-flex align-items-center justify-content-between py-3 px-5 my-3' >
            <div className="dashboard-card__text">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>

            <div>
                {icon}
            </div>
        </NavLink >
    );
}

export default DashboardCard;