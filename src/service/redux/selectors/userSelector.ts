import { type RootState } from "../store";

export const selectUsersPage = (state: RootState) => state.users;
export const selectUsers = (state: RootState) => state.users.content;
export const selectUserProfile = (state: RootState) => state.profile;
export const selectUserById = (state: RootState, id: string) =>
  state.users.content.find((u) => u.id === id);