import { Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
    title: string,
    description: string,
    icon: any
}

const IconMenu: React.FC<Props> = ({ title, description, icon }) => {
    return (
        <Grid container xs={3} alignItems="center">
            <Grid item xs={9}>
                <Typography variant='h4'>{title}</Typography>
                <Typography variant='subtitle1' gutterBottom >{description}</Typography>
            </Grid>

            <Grid item xs={3}>
                {icon}
            </Grid>
        </Grid>
    );
}

export default IconMenu;