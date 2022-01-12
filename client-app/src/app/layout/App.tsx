import { useAppDispatch } from '../store/configureStore';
import { useCallback, useEffect, useState } from 'react';
import { fetchCurrentUserAsync } from '../../features/account/accountSlice';

import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import { Container, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Dashboard from '../../features/dashboard/Dashboard';
import Header from './Header';
import LoadingComponent from './LoadingComponent';
import Login from '../../features/account/Login';
import NotFound from '../errors/NotFound';
import Register from '../../features/account/Register';
import ServerError from '../errors/ServerError';
import colors from '../styles/colors';

function App() {

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const theme = createTheme({
    palette: {
      mode: 'light'
    }
  });

  const initApp = useCallback(
    async () => {
      try {
        await dispatch(fetchCurrentUserAsync());
      } catch (error) {
        console.log(error);
      }
    }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  if (loading)
    return <LoadingComponent />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />

      <CssBaseline />

      <Header />

      <Container>
        <Routes>
          <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/server-error' element={<ServerError />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>

    </ThemeProvider>
  );
}

export default App;
