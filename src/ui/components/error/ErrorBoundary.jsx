import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineRounded";
import RefreshIcon from "@mui/icons-material/RefreshRounded";
import { useNotificationHandler } from "../../../hooks/useNotificationHandler";

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    if (this.props.notify) {
      this.props.notify(`An unexpected error occurred: ${error.message}`, "error");
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80vh",
              textAlign: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "error.lighter",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "error.main",
                mb: 1,
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 48 }} />
            </Box>
            <Stack spacing={1}>
              <Typography variant="h4" fontWeight={800} color="text.primary">
                Oops! Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The application encountered an unexpected error. Don't worry, your data is likely safe.
              </Typography>
            </Stack>
            
            <Box 
              sx={{ 
                p: 2, 
                bgcolor: "action.hover", 
                borderRadius: 2, 
                width: "100%", 
                overflow: "auto",
                maxHeight: 200,
                textAlign: "left"
              }}
            >
              <Typography variant="caption" sx={{ fontFamily: "monospace", color: "error.main" }}>
                {this.state.error?.toString()}
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<RefreshIcon />}
              onClick={this.handleReset}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}40`,
              }}
            >
              Reload Application
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = ({ children }) => {
  const { notify } = useNotificationHandler();
  return <ErrorBoundaryClass notify={notify}>{children}</ErrorBoundaryClass>;
};
