import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Profile } from "../../../../models/user.model";

const initialState: Profile | null = null;

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState as Profile | null,
  reducers: {
    setProfile: (_state, action: PayloadAction<Profile>) => {
      return action.payload;
    },
    clearProfile: () => {
      return null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;