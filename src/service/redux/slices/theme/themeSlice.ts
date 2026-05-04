import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ThemeState, type ThemeType } from '../../../../models/ui.model';

const initialState: ThemeState = {
  themeType: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeType = state.themeType === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.themeType = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
