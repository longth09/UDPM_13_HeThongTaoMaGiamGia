import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import LogoSC from '../../assets/images/LogoSC.png';
import LogoGioHang from '../../assets/images/Logo-GioHang.png';
import LogoUser from '../../assets/images/Logo-user.png';
import LogoThongBao from '../../assets/images/Logo-ThongBao.png';
import LogoSearch from '../../assets/images/Logo-Search.png';
import LogoHome from '../../assets/images/Logo-Home.png';
import LogoSell from '../../assets/images/Logo-Sell.png';
import ListAll from '../client/ListAll';

const Header = () => {
    return (
        <>
            <div>
                <div className='d-flex justify-content-between container '>
                    <div className='logo'>
                        <Image src={LogoSell} />
                        <div className='name-shop fs-3 fw-bold '>&nbsp;SellSmart Codes</div>
                    </div>

                    <div className='search mt-4 '>
                        <InputGroup size="sm" className="" style={{ width: 650 }}>
                            <InputGroup.Text className='bg-white rounded-start-5  border-end-0 border-dark '><Image
                                src={LogoSearch} /></InputGroup.Text>
                            <Form.Control className='border-start-0 rounded-end-5 border-dark '
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                            />
                            <Button type="button" className="btn btn-dark ms-3 rounded-5 px-4">SEARCH</Button>
                        </InputGroup>


                    </div>
                    <div className='d-flex justify-content-between mt-4'>
                        <div className='logo-user'>
                            <Image src={LogoUser} />

                        </div>

                        <NavDropdown id="basic-nav-dropdown">
                            <NavDropdown.Item href="Login">Đăng nhập</NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/SC-Online/Login">
                                Đăng ký
                            </NavDropdown.Item>
                        </NavDropdown>

                        <div className='logo-thong-bao px-5'>
                            <NavLink to="/"> <Image src={LogoThongBao} /></NavLink>
                        </div>
                        <div className='logo-gio-hang'>
                            <NavLink to="/"> <Image src={LogoGioHang} /></NavLink>
                        </div>
                    </div>
                </div>

                <ListAll/>

                <div className=''>
                    <Navbar expand="lg" className=" ">
                        <Container>
                            <Navbar.Collapse id="basic-navbar-nav ">
                                <Nav className="me-auto fw-bold " style={{ marginLeft: 300 }}>
                                    <NavLink to="/SC-Online/TrangChu" className='nav-link'> <Image
                                        src={LogoHome} /> &nbsp;Trang chủ </NavLink>
                                    <NavLink to="/SC-Online/SanPham" className='nav-link mx-5'>Cửa hàng</NavLink>
                                    <NavLink to="/SC-Online/DetailSanPham" className='nav-link'>Tra cứu hóa
                                        đơn </NavLink>
                                    <NavDropdown title="Trang" id="basic-nav-dropdown" className='mx-5'>
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Separated link
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavLink to="/SC-Online/LienHe" className='nav-link'>Liên hệ </NavLink>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div className='border border-dark border-2 border-0 border-top '>
                    <div className='container px-5'>
                        <Image src={LogoHome} className='py-2' />
                    </div>
                </div>
            </div>
        </>

    );
}

export default Header;