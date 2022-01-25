import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import './mainPage.scss'

interface Props {
    title: string,
    content?: React.ReactNode,
    searchValue?: string,
    onSearch?: (value: string) => void
    buttonTitle?: string,
    navigateTo?: string,
}

const MainPage: React.FC<Props> = ({ title, content, searchValue, onSearch = (value: string) => { }, buttonTitle, navigateTo }) => {
    return (
        <div>
            <h4 className="main-page d-flex align-items-center px-4">{title}</h4>

            <div className="px-5 pb-5">
                <Row className="d-flex align-items-center justify-content-between py-4 ms-1" md={5}>
                    <Col className="d-flex align-items-center p-0" >
                        <Form.Control type="email" placeholder="Search..." value={searchValue} onChange={evt => onSearch(evt.target.value)} />
                    </Col>

                    {buttonTitle ?
                        <Col className="d-flex justify-content-end">
                            <Button className="d-flex align-item-center main-page__button" href={navigateTo}>
                                <AddOutlinedIcon className='me-2' />
                                {buttonTitle}
                            </Button>
                        </Col>
                        :
                        <></>
                    }
                </Row>

                {content}

            </div>

        </div>
    );
}

export default MainPage;