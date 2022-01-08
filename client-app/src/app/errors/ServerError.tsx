import { Container, Paper, Typography } from '@mui/material'
import React from 'react'

interface Props {
  
}

const ServerError: React.FC<Props> = ({}) => {
  return (
    <Container component={Paper}>
      <Typography variant='h5' gutterBottom>Server Error</Typography>
    </Container>
  )
}

export default ServerError
