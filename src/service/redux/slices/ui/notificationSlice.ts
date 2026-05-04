import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type NotificationState, type NotificationSeverity } from "../../../../models/ui.model";

const initialState: NotificationState = {
  open: false,
  message: "",
  severity: "info",
  duration: 6000,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; severity?: NotificationSeverity; duration?: number; isAuthError?: boolean }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || "info";
      state.duration = action.payload.duration || 6000;
      state.isAuthError = action.payload.isAuthError || false;
    },
    hideNotification: (state) => {
      state.open = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
