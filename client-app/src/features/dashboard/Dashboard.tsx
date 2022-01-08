import { Container, Paper, Typography } from '@mui/material'
import React from 'react'

interface Props {
  
}

const Dashboard: React.FC<Props> = ({}) => {
  return (
    <Container component={Paper}>
      <Typography variant='h5' gutterBottom>Dashboard</Typography>
    </Container>
  )
}

export default Dashboard
