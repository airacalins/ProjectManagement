import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ITenant } from '../../app/models/tenant';
import ImageIcon from '@mui/icons-material/Image';

interface Props {
}

const Tenant:React.FC<Props> = ({}) => {
  const [tenants, setTenants] = useState<ITenant[]>([]);

  useEffect(() => {
    fetch('https://localhost:7019/api/tenants')
    .then(response => response.json())
    .then(data => setTenants(data));
  }, [])

  return (
    <h1>Tenant</h1>
  )
}

export default Tenant;