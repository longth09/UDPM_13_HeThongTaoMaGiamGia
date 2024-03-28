import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
// import Logo from '../components/logo';
import Iconify from '../component/iconify';
// sections

// eslint-disable-next-line import/named
import {SignUpForm} from "../sections/auth/signUp";
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
  // boxShadow: theme.customShadows.card,
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

export default function SignUpPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <AlertProvider>
        <AlertSnackbar />

      <Helmet>
        <title> Đăng Ký Tài Khoản  </title>
      </Helmet>

      <StyledRoot>
        {/* <Logo
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
            <SignUpForm />
          </StyledContent>
        </Container>
      </StyledRoot>
      </AlertProvider>
    </>
  );
}
