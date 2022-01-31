import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import './page.scss'


interface Props {
    title?: string,
    backNavigationLink?: string
    content: React.ReactNode
}

const DetailsPage: React.FC<Props> = ({ title, backNavigationLink, content }) => {
    return (
        <div>
            {
                backNavigationLink &&
                <Button className="page d-flex align-items-center px-4 mb-1" as={Link} to={backNavigationLink}>
                    <MenuOpenOutlinedIcon />
                </Button>
            }

            {
                title && <h4 className="page__title d-flex align-items-center px-4 mb-3">{title}</h4>

            }

            <div className="page__container px-5 py-4 mx-5 my-4">
                {content}
            </div>

        </div >
    );
}

export default DetailsPage;