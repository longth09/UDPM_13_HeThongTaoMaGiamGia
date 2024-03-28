import { Outlet } from 'react-router-dom';
import Footer from '../client/Footer';
import Header from '../client/Header';
import { AlertProvider } from "./AlertContext";
import AlertSnackbar from "./AlertSnackbar";
// @mui
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function DashboardLayoutClient() {
  return (
    // <StyledRoot>
    //   <Main>
    <>
      <AlertProvider >
        <AlertSnackbar />

        <Header />
        <Outlet />
        <Footer />
      </AlertProvider>
    </>

    //   </Main>
    // </StyledRoot>
  );
}
