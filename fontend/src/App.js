import React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import CouponsPage from './layout/coupons/CouponsPage';
import AddCoupons from './layout/coupons/AddCoupons';
import Header from './layout/commons/Header';
import Footer from './layout/commons/Footer';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import UpdateCoupons from './layout/coupons/UpdateCoupons';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ContextProvider } from './component/ContextProvider';
require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
    return (
      <ContextProvider>
        <Router>
            <Routes>
                <Route path="/home" element={<LayoutWithHeaderFooter><CouponsPage/></LayoutWithHeaderFooter>}/>
                <Route path="/vouchers/add" element={<LayoutWithHeaderFooter><AddCoupons/></LayoutWithHeaderFooter>}/>
                <Route path="/voucher/update/:id"
                       element={<LayoutWithHeaderFooter><UpdateCoupons/></LayoutWithHeaderFooter>}/>
                <Route path="/dashboard/vouchers"
                       element={<LayoutWithHeaderFooter><CouponsPage/></LayoutWithHeaderFooter>}/>
                <Route path="/login" element={<LoginPageWithoutHeaderFooter/>}/>
                <Route path="/signup" element={<SignUpPageWithoutHeaderFooter/>}/>
                <Route path="/forgetPassword" element={<ForgetPasswordWithoutHeaderFooter/>}/>
            </Routes>
        </Router>

      </ContextProvider>
    );
}

function LayoutWithHeaderFooter({children}) {
    return (
        <>
        <WalletModalProvider>
            <Header/>
            {children}
            <Footer/>
            </WalletModalProvider>
        </>
    );
}

function LoginPageWithoutHeaderFooter() {
    return <LoginPage/>;
}

function SignUpPageWithoutHeaderFooter() {
    return <SignUpPage/>;
}

function ForgetPasswordWithoutHeaderFooter() {
    return <ForgetPasswordPage/>;
}

export default App;
