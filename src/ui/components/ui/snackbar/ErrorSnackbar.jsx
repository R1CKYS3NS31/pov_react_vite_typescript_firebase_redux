import { Alert, AlertTitle, Snackbar } from "@mui/material";

export const ErrorSnackbar = ({
  openErrorSnackBar,
  handleCloseErrorSnackBar,
  error,
}) => {
  return (
    <Snackbar
      open={openErrorSnackBar}
      autoHideDuration={10000}
      onClose={handleCloseErrorSnackBar}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <Alert
        // title="Error"
        onClose={handleCloseErrorSnackBar}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </Snackbar>
  );
};
