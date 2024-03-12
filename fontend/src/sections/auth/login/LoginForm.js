import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// @mui
import {Alert, Backdrop, IconButton, InputAdornment, Link, Snackbar, Stack, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// components
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import CircularProgress from '@mui/material/CircularProgress';
import Iconify from '../../../components/iconify';
import {useAlert} from '../../../layouts/dashboard/AlertContext';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);

  const [params, setParams] = useState({
    email: '',
    password: '',
  });

  const getParam = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  // Handle login
  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/detail-user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 200) {
        localStorage.setItem('userFormToken', JSON.stringify(response.data));
        // console.log('response:', response.data);
        // console.log('response: ', response);
        const authorities = response.data.authorities[0].authority;
        navigate(authorities === 'ROLE_ADMIN' || authorities === 'ROLE_STAFF' ? '/dashboard/app' : '/client/home');
        window.location.reload();
      } else {
        showAlert('error', 'Đăng Nhập Thất Bại');
        throw Error(response.status);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleClick = async () => {
    console.log(params);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Basic Og==');

    const raw = JSON.stringify({
      username: params.email.trim(),
      password: params.password.trim(),
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    // console.log("requestOptions:",requestOptions);
    try {
      handleOpenBD();
      const response = await fetch('http://localhost:8080/api/login', requestOptions);

      if (response.ok) {
        showAlert('success', 'Đăng Nhập Thành Công');
        handleCloseBD();
        const result = await response.json();
        // console.log('result: ', result);
        localStorage.setItem('accessToken', result.accessToken);
        await fetchUserData();
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      // console.log('error', error);
      handleCloseBD();
      showAlert('error', 'Đăng Nhập Thất Bại');
    }
  };
  const responseGoogle = async (credentialResponse) => {
    try {
      handleOpenBD();
      const res = await axios.post('http://localhost:8080/google-login', credentialResponse.credential);

      if (res.status === 200) {
        showAlert('success', 'Đăng Nhập Thành Công');
        handleCloseBD();
        localStorage.setItem('accessToken', res.data);
        await fetchUserData();
      } else {
        handleCloseBD();
        throw new Error(res);
      }
    } catch (error) {
      handleCloseBD();
      showAlert('error', 'Đăng Nhập Thất Bại');
    }
  };
  // backdrop
  const [openBD, setOpenBD] = useState(false);
  const handleCloseBD = () => {
    setOpenBD(false);
  };
  const handleOpenBD = () => {
    setOpenBD(true);
  };

  return (
    <>
      <Stack spacing={3}>
        <GoogleOAuthProvider clientId="964666128031-58ftilgfcv1dtnn3ke442vv5qjmei4da.apps.googleusercontent.com">
          <GoogleLogin onSuccess={responseGoogle} onFailure={responseGoogle} cookiePolicy="single_host_origin" />
        </GoogleOAuthProvider>

        <TextField name="email" label="Email" value={params.email.trim()} onChange={(e) => getParam(e)} />

        <TextField
          name="password"
          label="Mật Khẩu"
          onChange={(e) => getParam(e)}
          value={params.password.trim()}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" href="/forgetPassword">
          Quên Mật Khẩu
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Đăng Nhập
      </LoadingButton>
      {alertContent && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={alertContent.type} sx={{ width: '100%' }}>
            {alertContent.message}
          </Alert>
        </Snackbar>
      )}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBD}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
export const accessToken = localStorage.getItem('accessToken');
