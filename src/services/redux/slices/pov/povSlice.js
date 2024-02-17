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
        return state.povs.finc((pov) => pov._id === povId);
      }
      return null;
    },
    updatePoV: (state, action) => {
      const updatedPoV = action.payload;
      return state.map((existingPoV) =>
        existingPoV._id === updatedPoV._id ? updatedPoV : existingPoV
      );
    },
    deletePov: (state, action) => {
      const povIdToDelete = action.payload;
      return state.filter((existingPoV) => existingPoV._id !== povIdToDelete);
    },
    deleteAllPoVs: (state, action) => {
      return [];
    },
  },
});

export const {
  setPovs,
  getPoVById,
  addPoV,
  updatePoV,
  deletePov,
  deleteAllPoVs,
} = povSlice.actions;

export default povSlice.reducer;
