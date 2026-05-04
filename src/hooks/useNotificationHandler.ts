import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideNotification,
  showNotification,
} from "../service/redux/slices/ui/notificationSlice";
import { selectNotification } from "../service/redux/selectors/notificationSelector";
import { type NotificationSeverity } from "../models/ui.model";

export const useNotificationHandler = () => {
  const dispatch = useDispatch();
  const reduxNotification = useSelector(selectNotification);

  // We keep the notification object for local compatibility in hooks, 
  // but it's now synced with Redux.
  const notification = useMemo(() => ({
    open: reduxNotification.open,
    message: reduxNotification.message,
    severity: reduxNotification.severity,
    duration: reduxNotification.duration || 6000,
    isAuthError: reduxNotification.isAuthError || false,
  }), [reduxNotification]);

  const notify = useCallback((message: string, severity: NotificationSeverity = 'info', isAuthError = false) => {
    dispatch(showNotification({ message, severity, isAuthError }));
  }, [dispatch]);

  const closeNotification = useCallback(() => {
    dispatch(hideNotification());
  }, [dispatch]); 
  
  const handleApiError = useCallback((err: any, customFallbackMessage: string | null = null) => {
    let message = customFallbackMessage || 'An unexpected error occurred. Please try again.';
    let isAuthError = false;

    if (err?.response) {
      const status = err.response.status;
      const data = err.response.data;

      if (status === 401 || status === 403) {
        isAuthError = true;
        message = data?.message || 'Authentication failed. Please log in again.';
      } else if (status === 404) {
        message = data?.message || 'Requested resource could not be found.';
      } else if (status === 422 || status === 400) {
        message = data?.message || data?.error || 'Invalid data provided.';
      } else if (status >= 500) {
        message = 'Server encountered an error. Please try again later.';
      } else {
        message = data?.message || message;
      }
    } else if (err?.status) {
      const status = err.status;
      if (status === 401 || status === 403) {
        isAuthError = true;
        message = 'Authentication failed. Please log in again.';
      } else if (status === 404) {
        message = 'Requested resource not found.';
      } else if (status >= 500) {
        message = 'Server encountered an error.';
      } else if (err.message) {
        message = err.message;
      }
    } else if (err?.message) {
      if (err.message.toLowerCase().includes('network') || err.message.toLowerCase().includes('failed to fetch')) {
        message = 'Network error. Please check your internet connection.';
      } else {
        message = err.message;
      }
    }

    notify(message, 'error', isAuthError);
    
    if (import.meta.env.MODE !== 'production') {
      console.error('[API Error]:', err);
    }
  }, [notify]);

  const value = useMemo(() => ({
    notification,
    notify,
    handleApiError,
    closeNotification,
  }), [notification, notify, handleApiError, closeNotification]);

  return value;
};
