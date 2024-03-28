import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../assets/images/Logo-Sell.png';
// sections
import { LoginForm } from '../sections/auth/login';
import {AlertProvider} from "../layouts/dashboard/AlertContext";
import AlertSnackbar from "../layouts/dashboard/AlertSnackbar";

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <> <AlertProvider>
      <AlertSnackbar />

      <Helmet>
        <title> Đăng nhập | SellSmart Codes</title>
      </Helmet>

      <StyledRoot>
        {/* <Logo
        src={Logo}
        alt="Logo"
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        /> */}

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
             Chào Mừng Tới SellSmart Codes
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Đăng Nhập SellSmart Codes
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Chưa có tài khoản? {''}
              <Link variant="subtitle2" href="/signUp" >Đăng Ký</Link>
            </Typography>


            <Divider sx={{ my: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </AlertProvider>
    </>
  );
}
