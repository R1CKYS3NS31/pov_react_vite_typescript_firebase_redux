import { combineReducers } from "@reduxjs/toolkit";
import povSlice from "../slices/pov/povSlice";
import userSlice from "../slices/user/userSlice";
import userAccountSlice from "../slices/user/userAccountSlice";
import profileSlice from "../slices/user/profileSlice";
import povLocalSlice from "../slices/pov/povLocalSlice";
import myPovSlice from "../slices/pov/myPovSlice";
import themeReducer from "../slices/theme/themeSlice";
import notificationReducer from "../slices/ui/notificationSlice";

export const rootReducer = combineReducers({
  userAccount: userAccountSlice,
  users: userSlice,
  povs: povSlice,
  profile: profileSlice,
  povsLocal: povLocalSlice,
  myPovs: myPovSlice,
  theme: themeReducer,
  notification: notificationReducer,
});
