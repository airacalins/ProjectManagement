import { Container, Paper, Typography } from '@mui/material'
import React from 'react'

interface Props {
  
}

const NotFound: React.FC<Props> = ({}) => {
  return (
    <Container component={Paper}>
      <Typography variant='h5' gutterBottom>Not Found</Typography>
    </Container>
  )
}

export default NotFound
