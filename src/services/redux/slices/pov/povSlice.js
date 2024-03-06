import { createSlice } from "@reduxjs/toolkit";

export const povSlice = createSlice({
  name: "povs",
  initialState: [],
  reducers: {
    setPovs: (state, action) => {
      return action.payload;
    },
    addPoV: (state, action) => {
      const pov = action.payload;
      state.push(pov);
    },
    getPoVById: (state, action) => {
      const povId = action.payload;
      if (state.povs) {
        return state.povs.finc((pov) => pov.id === povId);
      }
      return null;
    },
    editPoV: (state, action) => {
      const updatedPoV = action.payload;
      return state.map((existingPoV) =>
        existingPoV.id === updatedPoV.id ? updatedPoV : existingPoV
      );
    },
    removePov: (state, action) => {
      const povIdToDelete = action.payload;
      return state.filter((existingPoV) => existingPoV.id !== povIdToDelete);
    },
    removeAllPoVs: (state, action) => {
      return [];
    },
  },
});

export const {
  setPovs,
  getPoVById,
  addPoV,
  editPoV,
  removePov,
  removeAllPoVs,
} = povSlice.actions;

export default povSlice.reducer;
