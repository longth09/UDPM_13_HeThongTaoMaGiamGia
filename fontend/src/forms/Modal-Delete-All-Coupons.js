import { Alert, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState, forwardRef } from 'react';
// import { removeAll } from '../service/CouponsService';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalDeleteAllCoupons(props) {
  const { open, handleClose, information } = props;
  const [alertContent, setAlertContent] = useState(null);

  console.log(information)

  const handleDelete = async () => {
    if (information.length !== 0) {
      console.log('Request Payload:', information);
      try {
        // const response = await removeAll(information);
        const response = null;
        console.log('Server Response:', response);
        setAlertContent({
          type: 'success',
          message: 'Xóa thành công!',
        });
      } catch (error) {
        console.error('Error from Server:', error);
        setAlertContent({
          type: 'error',
          message: 'Lỗi của chúng tôi!',
        });
      }
      handleClose();
    } else {
      setAlertContent({
        type: 'error',
        message: 'Lỗi của chúng tôi!',
      });
      handleClose();
    }
  };


  const handleSnackbarClose = (event, reason) => {
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
        <DialogTitle>{'Xóa Coupons'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Xóa Coupons </DialogContentText>
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
