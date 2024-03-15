import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';


import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Backdrop, TextField} from "@mui/material";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import {postSignUp} from "../../../service/taiKhoanKhachHangSevice";
import {useAlert} from "../../../layouts/dashboard/AlertContext";


// ----------------------------------------------------------------------

export default function SignUpForm() {

    const {showAlert} = useAlert();
    const [maTaiKhoan] = useState(null);
    const [ho, setHo] = useState("");
    const [ten, setTen] = useState("");
    const [sdt, setSdt] = useState("");
    const [email, setEmail] = useState("");
    const [matKhau] = useState(null);
    const [trangThai] = useState("0");

    // chuyen trang
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState("");
    const validateFields = () => {
        let isValid = true;
        const newValidation = {};

        if (!ho) {
            newValidation.ho = 'Họ không được để trống';
            isValid = false;
        }

        if (!ten) {
            newValidation.ten = 'Tên không được để trống';
            isValid = false;
        }

        if (!sdt) {
            newValidation.sdt = 'Số điện thoại không được để trống';
            isValid = false;
        }
        if (!email) {
            newValidation.email = 'Email không được để trống';
            isValid = false;
        }

        setValidationErrors(newValidation);

        return isValid;
    };

    useEffect(() => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, ho: '' }));
    }, [ho]);
    useEffect(() => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, ten: '' }));
    }, [ten]);
    useEffect(() => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, sdt: '' }));
    }, [sdt]);
    useEffect(() => {
        setValidationErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }, [email]);

    const handleSave = async () => {
        if (!validateFields()) {
            return;
        }
        let res;
        try {
            handleOpenBD();
            res = await postSignUp(
                maTaiKhoan,
                ho,
                ten,
                sdt,
                email.trim(),
                matKhau,
                trangThai
            );
            console.log("Check res: ", res);
        } catch (error) {
            if (error.response && error.response.data) {
                handleCloseBD()
                console.log(error.response.data);
                setValidationErrors(error.response.data);
            } else {
                handleCloseBD()
                console.error("Error:", error);
            }
            return;
        }

        if (res && res.idTaiKhoan) {
            handleCloseBD();
            showAlert('success', 'Đăng Ký Tài Khoản Thành Công');
            navigate("/client/home");
        } else {
            handleCloseBD();
            showAlert('error', 'Thêm Thất Bại');
        }

    };

    const [openBD, setOpenBD] = useState(false);
    const handleCloseBD = () => {
        setOpenBD(false);
    };
    const handleOpenBD = () => {
        setOpenBD(true);
    };
    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h3">
                    Đăng Ký Tài Khoản Mới
                </Typography>
                <Box component="form" sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"

                                error={!!validationErrors.ho}
                                helperText={validationErrors.ho}
                                fullWidth
                                margin={"dense"}
                                onChange={(event) => setHo(event.target.value)}
                                label="Họ"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField

                                id="lastName"
                                error={!!validationErrors.ten}
                                helperText={validationErrors.ten}
                                fullWidth
                                margin={"dense"}
                                label="Tên"
                                onChange={(event) => setTen(event.target.value)}
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField

                                fullWidth
                                error={!!validationErrors.sdt}
                                helperText={validationErrors.sdt}
                                margin={"dense"}
                                inputProps={{maxLength: 10}}
                                onChange={(event) => setSdt(event.target.value)}
                                label="Số Điện Thoại"
                                type="text"
                                id="phone"
                                autoComplete="new-phone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField

                                fullWidth
                                id="email"
                                label="Địa Chỉ Email"
                                error={!!validationErrors.email}
                                helperText={validationErrors.email}
                                margin={"dense"}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                            />
                        </Grid>

                    </Grid>
                    <Button
                        onClick={() => handleSave()}
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Đăng Ký
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Đã có tài khoản? Đăng Nhập
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/forgetPassword" variant="body2">
                                Quên mật khẩu ?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={openBD}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Container>

    );
}

