import { useState } from 'react';
import * as Yup from 'yup';
import { IDateDurationInput } from '../../app/models/report';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { TableHead } from '@mui/material';
import { Col, FormLabel, Row } from 'react-bootstrap';
import FormTextInput from '../../app/layouts/components/form/FormTextInput';
import FormPage from '../../app/layouts/components/pages/FormPage';
import { Form, Label } from "semantic-ui-react";
import FormButtonContainer from '../../app/layouts/components/form/FormButtonContainer';
import FunctionalButton from '../../app/layouts/components/buttons/FunctionalButton';
import MainPage from '../../app/layouts/components/pages/MainPage';


const Report = () => {
    const [dateDuration, setDateDuration] = useState<IDateDurationInput>({
        startDate: new Date(),
        endDate: new Date(),
    })

    const validationSchema = Yup.object({
        startDate: Yup.string().required("Start date is required"),
        endDate: Yup.string().required("Start date is required"),
    })

    const columns = [
        { title: 'Date' },
        { title: 'Confirmed Payment' },
    ]

    return (
        <></>
    );
}

export default Report;

