import { Alert, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState, useEffect, forwardRef } from 'react';
// import { del } from '../../service/CouponsService';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalDeleteCoupon(props) {
  const { open, handleClose, information } = props;
  const [idCoupon, setidCoupon] = useState('');
  const [alertContent, setAlertContent] = useState(null);


  useEffect(() => {
    if (information != null) {
      setidCoupon(information.idCoupon);
    } else {
      setidCoupon('');
    }
  }, [information]);

  const handleDelete = async () => {
    if (information.trangThai === 0) {
      console.log(information.idCoupon);
      // await del(information.idCoupon, 10);
      setAlertContent({
        type: 'success',
        message: 'Xóa thành công!',
      });
    } else if (information.trangThai === 10) {
      setAlertContent({
        type: 'warning',
        message: 'Không thể xóa!!!',
      });
    } else {
      setAlertContent({
        type: 'error',
        message: 'Lỗi của chúng tôi!',
      });
    }
    handleClose();
  };

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Xóa Coupon'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Xóa Voucher Có Mã Là: {idCoupon}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDelete}>Đồng Ý</Button>
        </DialogActions>
      </Dialog>

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
    </div>
  );
}
