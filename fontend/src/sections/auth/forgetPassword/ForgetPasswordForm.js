import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {Backdrop, Dialog, DialogContent, TextField} from "@mui/material";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import {postForgetPassword} from "../../../service/taiKhoanKhachHangSevice";


// ----------------------------------------------------------------------

export default function ForgetPasswordForm() {


    const [email, setEmail] = useState("");
    // chuyen trang
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState("");
    const handleSave = async () => {

        let res;
        try {
            handleOpenBD();
            res = await postForgetPassword(
                email.trim(),
            );
            console.log("Check res: ", res);
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);
                handleCloseBD();
                setValidationErrors(error.response.data);
            } else {
                console.error("Error:", error);
            }
            return;
        }

        if (res.email) {
            handleCloseBD();
            handlOpenAdd();

        }

    };
    const [openAdd, setOpenAdd] = useState(false);

    const handlOpenAdd = () => {
        setOpenAdd(true);
    };

    const handlCloseAdd = () => {
        setOpenAdd(false);
        navigate('/login');
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
                    Quên Mật Khẩu
                </Typography>
                <Box component="form" sx={{mt: 3, textAlign: 'center', width: '100%'}}>
                    <Grid container spacing={2}>
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
                        sx={{mt: 4, mb: 3, fontSize: '18px'}}
                    >
                        Quên mật khẩu
                    </Button>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Link href="/signUp" variant="body2">
                                Đăng ký tài khoản mới
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link href="/login" variant="body2">
                                Đã có tài khoản? Đăng Nhập
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Dialog
                open={openAdd}
                onClose={handlCloseAdd}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                    <div style={{textAlign: 'center', padding: '16px'}}>
                        <CheckCircleIcon style={{fontSize: '48px', marginBottom: '16px'}}/>
                        <Typography variant="h6">Đổi mật khẩu thành công</Typography>
                    </div>
                </DialogContent>

            </Dialog>
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={openBD}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Container>

    );
}

