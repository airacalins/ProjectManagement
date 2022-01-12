import { Button, Container, Grid, Paper, styled, Typography } from '@mui/material'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import React from 'react'
import IconMenu from '../../app/layout/dashboard/IconMenu';

interface Props {

}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard: React.FC<Props> = ({ }) => {
  return (
    <>

      <Typography variant='h5' gutterBottom>Dashboard</Typography>

      <Grid container>

        <IconMenu title="Slot" description='27 available slots' icon={<StorefrontIcon color="disabled" sx={{ fontSize: 60 }} />} />
        <IconMenu title="Tenant" description='3 tenants' icon={<PeopleAltOutlinedIcon color="disabled" sx={{ fontSize: 60 }} />} />
        <IconMenu title="Payment" description='1 new payment' icon={<AttachMoneyOutlinedIcon color="disabled" sx={{ fontSize: 60 }} />} />
        <IconMenu title="Late Payment" description='1 late payment' icon={<CloseOutlinedIcon color="disabled" sx={{ fontSize: 60 }} />} />

      </Grid>

    </>

  )
}

export default Dashboard
