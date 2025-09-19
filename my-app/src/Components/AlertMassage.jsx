
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
 
export default function AlertMassage({ open, Massege }) {
    return (
        <div>
            <Snackbar
                open={open}
            >
                <Alert
                        severity="success"
                    variant="filled"
                    color='primary'
                    sx={{ width: '100%' }}
                >
                    {Massege}
                </Alert>
            </Snackbar>
        </div>
    );
}
