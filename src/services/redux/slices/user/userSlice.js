import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => {
      const user = {
        name: action.payload.name,
        email: action.payload.email,
        // password: action.payload.password,
      };
      state.push(user);
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.uid === action.payload.uid);
    },
  },
});
export const { setUsers, addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
