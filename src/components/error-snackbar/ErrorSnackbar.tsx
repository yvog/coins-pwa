import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

type ErrorSnackbarProps = {
    show?: boolean;
    message: React.ReactNode;
};

export const ErrorSnackbar = ({ show, message }: ErrorSnackbarProps) => {
    const [showError, setShowError] = useState<boolean>();

    return (
        <Snackbar
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
            }}
            open={(show && typeof showError === 'undefined') ?? showError}
            onClose={() => setShowError(false)}
        >
            <Alert
                onClose={() => setShowError(false)}
                severity="error"
                sx={{ width: '100%' }}
                componentsProps={{
                    closeButton: {
                        sx: {
                            transform: 'translateY(-1px)'
                        }
                    }
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
