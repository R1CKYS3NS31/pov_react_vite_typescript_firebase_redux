import { combineReducers } from "@reduxjs/toolkit";
import povSlice from "../slices/pov/povSlice";

export const rootReducer = combineReducers({
  povs: povSlice,
});
