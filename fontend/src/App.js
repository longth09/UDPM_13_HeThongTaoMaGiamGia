import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CouponsPage from './layout/coupons/CouponsPage';
import AddCoupons from './layout/coupons/AddCoupons';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CouponsPage />} />
        {/* <Route path="/about" element={<AddCoupons />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
