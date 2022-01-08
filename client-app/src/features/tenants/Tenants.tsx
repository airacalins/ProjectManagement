import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ITenant } from '../../app/models/tenant';
import agent from '../../app/api/agent';
import { useAppDispatch, useAppSelecter } from '../../app/store/configureStore';
import { fetchTenantsAsync, setId } from './tenantSlice';
import LoadingComponent from '../../app/layout/LoadingComponent';

interface Props {
}

const Tenants:React.FC<Props> = ({}) => {
  const {id, tenants, status} = useAppSelecter(state => state.tenant);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTenantsAsync());
  }, [])

  if (status !== 'idle')
    return <LoadingComponent />
    
  return (
    <h1>Tenants {id} <Button onClick={() => dispatch(setId(id + 1))}>Click Me</Button>{tenants && tenants.map(t => t.firstName)}</h1>
  )
}

export default Tenants;