import { Backdrop, Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

interface Props {
  message?: string;
}

const LoadingComponent: React.FC<Props> = ({message = 'Loading...'}) => {
  return (
    <Backdrop open={true} invisible={true}>
      <Box display='flex' justifyContent='center' alignItems='center' height='100h'>
        <CircularProgress size={100} color='secondary'/>
        <Typography variant='h4' style={{justifyContent: 'center', position: 'fixed', top: '60%'}}>{message}</Typography>
      </Box>
    </Backdrop>
  )
}

export default LoadingComponent;
