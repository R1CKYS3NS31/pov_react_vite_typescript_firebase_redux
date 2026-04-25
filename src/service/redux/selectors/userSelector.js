export const selectUsersPage = (state) => state.users;
export const selectUsers = (state) => state.users.content;
export const selectUserProfile = (state) => state.profile;
export const selectUserById = (state, id) =>
  state.users.content.find((u) => u.id === id);