// AlertSnackbar.js


import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAlert } from './AlertContext';

const AlertSnackbar = () => {
    const { alertContent, clearAlert } = useAlert();

    return (
        <Snackbar
            open={!!alertContent}
            autoHideDuration={3000}
            onClose={clearAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={clearAlert} severity={alertContent?.type} sx={{ width: '100%' }}>
                {alertContent?.message}
            </Alert>
        </Snackbar>
    );
};

export default AlertSnackbar;
