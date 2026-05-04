import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "../../../../models/user.model";

interface UserState {
  content: User[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  empty: boolean;
}

const initialState: UserState = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  number: 0,
  size: 30,
  empty: true,
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{ content: User[]; totalElements?: number; size?: number }>) => {
      const { content, totalElements, size } = action.payload;
      state.content = content;
      state.totalElements = totalElements || content.length;
      state.size = size || state.size;
      state.empty = content.length === 0;
      state.totalPages = Math.ceil(state.totalElements / state.size);
    },
    addUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.content.push(user);
      state.totalElements += 1;
      state.empty = false;
      state.totalPages = Math.ceil(state.totalElements / state.size);
      state.number = Math.floor(state.totalElements / state.size) - 1;
    },
    removeUser: (state, action: PayloadAction<{ id: string }>) => {
      state.content = state.content.filter(
        (user) => user.id !== action.payload.id,
      );
      state.totalElements -= 1;
      state.totalPages = Math.ceil(state.totalElements / state.size);
      state.number = Math.floor(state.totalElements / state.size) - 1;
      state.empty = state.totalElements === 0;
    },
    removeAllUsers: () => {
      return initialState;
    },
  },
});

export const { setUsers, addUser, removeUser, removeAllUsers } =
  userSlice.actions;
export default userSlice.reducer;
