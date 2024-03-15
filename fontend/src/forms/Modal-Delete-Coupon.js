import { useState, useEffect, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import { delCouponHd } from '../service/CouponsService';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ModalDeleteCoupon(props) {
  // Get Props
  ModalDeleteCoupon.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    // itemDelete: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    listHD: PropTypes.object.isRequired,
    getDetailHD: PropTypes.func.isRequired
  };
  const { open, handleClose, listHD, getDetailHD } = props;

  // Set maHd using useState

  const [alertContent, setAlertContent] = useState(null);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };
  // Handle Delete
  const handleDelete = async () => {
    console.log('DataCart: ', listHD);
    if (!listHD) {
      setAlertContent({
        type: 'warning',
        message: 'Không Thể Xóa',
      });
    } else {
      await delCouponHd(listHD.idHd);
      getDetailHD();
      setAlertContent({
        type: 'success',
        message: 'Xóa Mã Giảm Giá Thành Công',
      });
      handleClose();
    }
  };

  return (
    <>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Xóa Sản Phẩm'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">Xóa Giảm Giá Có Mã Là: {listHD.maGiamGia}</DialogContentText>
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
    </>
  );
}
