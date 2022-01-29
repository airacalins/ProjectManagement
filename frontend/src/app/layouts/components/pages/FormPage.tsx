import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import './page.scss'

interface Props {
    backNavigationLink?: string
    title: string
    form: React.ReactNode,
}

const FormPage: React.FC<Props> = ({ backNavigationLink, title, form }) => {
    return (
        <div>
            {
                backNavigationLink &&
                <Button className="page d-flex align-items-center px-4 mb-1" as={Link} to={backNavigationLink}>
                    <MenuOpenOutlinedIcon />
                </Button>
            }

            <h3 className="page__title w-100 d-flex align-items-center px-4">{title}</h3>

            <div className="page__container px-5 py-4 mx-5 my-4">
                {form}
            </div>
        </div >
    );
}

export default FormPage;