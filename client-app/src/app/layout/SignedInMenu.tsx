import * as React from 'react';
import { useAppDispatch, useAppSelecter } from '../store/configureStore';
import { signOut } from '../../features/account/accountSlice';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const SignedInMenu = () => {
  const { user } = useAppSelecter(state => state.account);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} color='inherit' sx={{ typography: 'h6' }}>
        {user?.username}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => dispatch(signOut())}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default SignedInMenu;