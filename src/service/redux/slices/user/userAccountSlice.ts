import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "../../../../models/user.model";

const initialState: Partial<User> = {
  name: {
    first: "Guest",
    last: "User",
  },
  displayName: "Guest User",
  email: "",
  displayPicture: "",
  description: "I am a new PoV supporter ready to explore different perspectives!",
};

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState: initialState as User,
  reducers: {
    setUserAccount: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
    editUserAccount: (state, action: PayloadAction<Partial<User>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeUserAccount: () => initialState as User,
  },
});

export const { setUserAccount, editUserAccount, removeUserAccount } =
  userAccountSlice.actions;
export default userAccountSlice.reducer;
