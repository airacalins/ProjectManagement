import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelecter } from '../store/configureStore';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SignedInMenu from './SignedInMenu';

interface Props {

}

const Header: React.FC<Props> = ({ }) => {
  const { user } = useAppSelecter(state => state.account);
  const navigate = useNavigate();

  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          Maximarket
        </Typography>

        {
          !!user ? <SignedInMenu /> :
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </>
        }

      </Toolbar>
    </AppBar>
  )
}

export default Header;
