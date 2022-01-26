import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

interface Props {
    backNavigationLink: string
    form: React.ReactNode,
}

const FormPage: React.FC<Props> = ({ backNavigationLink, form }) => {
    return (
        <div>
            <Button className="main-page d-flex align-items-center px-4 mb-1" as={Link} to={backNavigationLink}>
                <MenuOpenOutlinedIcon />
            </Button>

            <div className="pb-5">
                {form}
            </div>
        </div >
    );
}

export default FormPage;