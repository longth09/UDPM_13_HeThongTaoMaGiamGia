import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
// import {toast} from "react-toastify";
import {Helmet} from 'react-helmet-async';
import {Alert, Box, Button, Container, InputAdornment, Snackbar, Stack, TextField, Typography} from '@mui/material';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {vi} from 'date-fns/locale'; // Import locale cho tiếng Việt
import RefreshIcon from '@mui/icons-material/Refresh';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
// import { detail, update } from '../../service/CouponsService';
import Iconify from '../../component/iconify';
import {useAlert} from '../../layouts/dashboard/AlertContext';
import ModalComfirm from '../../forms/Modal-Comfirm';

const UpdateCoupons = () => {
    const todayAtNoon = dayjs();
    const todayAt9AM = dayjs();
    const [randomCode, setRandomCode] = useState('');
    const [alertContent, setAlertContent] = useState(null);
    const {id} = useParams();

    // chuyen trang
    const navigate = useNavigate();

    const [coupon, setCoupon] = useState({
        tenChuongTrinh: '',
        code: '',
        moTa: '',
        thoiGianKetThuc: '',
        thoiGianTao: '',
        soLuongHienTai: '',
        phanTram: '',
        tienToiThieu: '',
    });

    const [open, setOpen] = useState(null);

    const openModal = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const {name, code, moTa, thoiGianKetThuc, soLuongHienTai, hoaDon, phanTram, tienToiThieu, soLuongHienTaiHienTai} = coupon;

    const onInputChange = (e) => {
        setCoupon({...coupon, [e.target.name]: e.target.value});
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertContent(null);
    };

    const {tenChuongTrinh, code, soLuongHienTai, phanTram, tienToiThieu, thoiGianTao, thoiGianKetThuc} = coupon;

    const selectedDatekt = dayjs(thoiGianKetThuc);
    const ngaykt = selectedDatekt.format('YYYY-MM-DDTHH:mm:ss', {locale: vi});
    const selectedDateBd = dayjs(thoiGianTao);
    const ngayBd = selectedDateBd.format('YYYY-MM-DDTHH:mm:ss', {locale: vi});
    const onChangeNbd = (newDate) => {
        // Lấy ngày giờ mới từ newDate
        const newDatetime = newDate;
        setCoupon({
            ...coupon,
            thoiGianTao: newDatetime,
        });
    };

    const onChangeNkt = (newDate) => {
        // Lấy ngày giờ mới từ newDate
        const newDatetime = newDate;
        setCoupon({
            ...coupon,
            thoiGianKetThuc: newDatetime,
        });
    };
    const handleSave = async () => {
        if (!tenChuongTrinh.trim()) {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập tên chương trình!',
            });
            return;
        }

        if (/\d/.test(tenChuongTrinh)) {
            setAlertContent({
                type: 'warning',
                message: 'Tên chương trình không được chứa số!',
            });
            return;
        }

        if (!code.trim()) {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập code!',
            });
            return;
        }

        if (soLuongHienTai === '') {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập số lượng!',
            });
            return;
        }

        if (soLuongHienTai < 1) {
            setAlertContent({
                type: 'warning',
                message: 'Số lượng phải là số nguyên lớn hơn 0!',
            });
            return;
        }

        if (phanTram === '') {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập phần trăm giảm giá!',
            });
            return;
        }

        if (phanTram < 1) {
            setAlertContent({
                type: 'warning',
                message: 'Phần trăm giảm giá phải là số nguyên lớn hơn 0!',
            });
            return;
        }

        if (tienToiThieu === '') {
            setAlertContent({
                type: 'warning',
                message: 'Vui lòng nhập số tiền tối thiểu!',
            });
            return;
        }

        if (tienToiThieu < 1) {
            setAlertContent({
                type: 'warning',
                message: 'Số tiền tối thiểu phải là số nguyên lớn hơn 0!',
            });
            return;
        }
        const checkDateValidity = () => dayjs(thoiGianKetThuc).isAfter(dayjs(thoiGianTao));

        const checkDateValidityNow = () => dayjs(thoiGianTao).isAfter(dayjs());

        if (!checkDateValidityNow()) {
            setAlertContent({
                type: 'warning',
                message: 'Chương trình phải giảm giá sau ít nhất 5 phút!',
            });
            return;
        }
        if (!checkDateValidity()) {
            setAlertContent({
                type: 'warning',
                message: 'Ngày kết thúc phải sau ngày bắt đầu!',
            });
            return;
        }

        let res;
        try {
            const couponAdd = {
                tenChuongTrinh: coupon.tenChuongTrinh,
                code: coupon.code,
                moTa: coupon.moTa,
                thoiGianKetThuc: ngaykt,
                thoiGianTao: ngayBd,
                soLuongHienTai: coupon.soLuongHienTai,
                phanTram: coupon.phanTram,
                tienToiThieu: coupon.tienToiThieu,
            };

            console.log('couponAdd: ', couponAdd);
            // res = await update(id, couponAdd);
            console.log('Check res: ', res);

            if (res && res.idCoupon) {
                const successMessage = {
                    type: 'success',
                    message: 'Thêm Thành Công!',
                };
                localStorage.setItem('successMessage', JSON.stringify(successMessage));
                navigate('/dashboard/coupons');
            } else {
                setAlertContent({
                    type: 'warning',
                    message: 'Thêm Thất Bại!',
                });
            }
        } catch (error) {
            setAlertContent({
                type: 'error',
                message: 'Đã xảy ra lỗi khi thêm giảm giá!',
            });
        }
    };

    function generateRandomCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const codeLength = 8;
        let code = '';

        for (let i = 0; i < codeLength; i += 1) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        coupon.code = code;
        return code;
    }

    const getOne = async () => {
        // const res = await detail(id);
        const res = null;
        setCoupon(res);
    };
    console.log('res: ', coupon);

    useEffect(() => {
        getOne();
    }, []);

    const refreshInput = () => {
        setRandomCode(generateRandomCode());
    };

    console.log('coupon: ', coupon);

    return (
        <>
            <Helmet>
                <title> Vouchers | SellSmart Codes </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Vouchers
                    </Typography>
                </Stack>

                <Box
                    component="form"
                    sx={{
                        display: 'flex', // Center horizontally
                        justifyContent: 'center', // Center horizontally
                        flexDirection: 'column', // Align items vertically
                        alignItems: 'center', // Align items horizontally
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        fullWidth
                        margin={'dense'}
                        label="Tên Chương Trình"
                        name="tenChuongTrinh"
                        value={coupon.tenChuongTrinh}
                        onChange={(e) => onInputChange(e)}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Code"
                        name="code"
                        value={coupon.code}
                        disabled
                        onChange={(e) => onInputChange(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button size="small" onClick={() => refreshInput()}>
                                        <RefreshIcon data-testid="RefreshIcon"/>
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        margin={'dense'}
                        label="Số Lượng"
                        name="soLuongHienTai"
                        type="number"
                        value={coupon.soLuongHienTai}
                        onChange={(e) => onInputChange(e)}
                    />

                    <div className="mb-3 text-center mt-3">
                        <p className="form-label">Ngày bắt đầu</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                            <DemoContainer components={['DateTimePicker']}>
                                <DemoItem>
                                    <DateTimePicker
                                        defaultValue={thoiGianTao}
                                        minDateTime={todayAt9AM}
                                        name="thoiGianTao"
                                        value={dayjs(thoiGianTao)}
                                        onChange={(e) => onChangeNbd(e)}
                                        renderInput={(props) => (
                                            <TextField
                                                fullWidth
                                                margin="dense"
                                                label="Thời Gian bắt đầu"
                                                {...props}
                                                sx={{
                                                    '& .MuiInputLabel-root': {
                                                        fontSize: '0.875rem !important',
                                                    },
                                                    '& .MuiInputBase-root': {
                                                        fontSize: '0.875rem !important',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <div className="mb-3 text-center mt-3">
                        <p className="form-label">Ngày kết thúc</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                            <DemoContainer components={['DateTimePicker']}>
                                <DemoItem>
                                    <DateTimePicker
                                        defaultValue={thoiGianKetThuc}
                                        minDateTime={todayAt9AM}
                                        name="thoiGianKetThuc"
                                        value={dayjs(thoiGianKetThuc)}
                                        onChange={(e) => onChangeNkt(e)}
                                        renderInput={(props) => (
                                            <TextField
                                                fullWidth
                                                margin="dense"
                                                label="Thời Gian Kết Thúc"
                                                {...props}
                                                sx={{
                                                    '& .MuiInputLabel-root': {
                                                        fontSize: '0.875rem !important',
                                                    },
                                                    '& .MuiInputBase-root': {
                                                        fontSize: '0.875rem !important',
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <TextField
                        fullWidth
                        margin={'dense'}
                        label="Phần Trăm Giảm"
                        name="phanTram"
                        type="number"
                        value={coupon.phanTram}
                        onChange={(e) => onInputChange(e)}
                    />

                    <TextField
                        fullWidth
                        margin={'dense'}
                        label="Số tiền tối thiểu"
                        name="tienToiThieu"
                        type="number"
                        value={coupon.tienToiThieu}
                        onChange={(e) => onInputChange(e)}
                    />
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        margin={'dense'}
                        label="Mô Tả"
                        name="moTa"
                        value={coupon.moTa}
                        onChange={(e) => onInputChange(e)}
                    />

                    <Button
                        size={'large'}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill"/>}
                        onClick={() => openModal()}
                        style={{marginTop: '20px'}} // Make button wider
                    >
                        Update Voucher
                    </Button>
                </Box>
            </Container>

            {alertContent && (
                <Snackbar
                    open
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                >
                    <Alert onClose={handleSnackbarClose} severity={alertContent.type} sx={{width: '100%'}}>
                        {alertContent.message}
                    </Alert>
                </Snackbar>
            )}
            <ModalComfirm
                open={open}
                handleClose={handleClose}
                information={handleSave}
                title={'Xác nhận sửa'}
                discription={'Xác nhận sửa coupon'}
            />
        </>
    );
};
export default UpdateCoupons;
