import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type PoV } from "../../../../models/pov.model";

interface PoVState {
  content: PoV[];
  totalPages: number;
  totalElements: number;
  number: number;
  last: boolean;
  size: number;
  empty: boolean;
}

const initialState: PoVState = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  number: 0,
  last: true,
  size: 30,
  empty: true,
};

export const povLocalSlice = createSlice({
  name: "povsLocal",
  initialState: initialState,
  reducers: {
    setPovsLocal: (state, action: PayloadAction<{ content: PoV[]; last: boolean; totalElements?: number; size?: number }>) => {
      const { content, last, totalElements, size } = action.payload;
      state.content = content;
      state.last = last;
      state.totalElements = totalElements || content.length;
      state.size = size || state.size;
      state.empty = content.length === 0;
      state.totalPages = Math.ceil(state.totalElements / state.size);
    },
    addPoVLocal: (state, action: PayloadAction<PoV>) => {
      const pov = action.payload;
      state.content.unshift(pov);
      state.totalElements += 1;
      state.totalPages = Math.ceil(state.totalElements / state.size);
      state.number = Math.floor(state.totalElements / state.size) - 1;
      state.last = state.number === state.totalPages - 1;
      state.empty = false;
    },
    editPoVLocal: (state, action: PayloadAction<PoV>) => {
      const updatedPoV = action.payload;
      const index = state.content.findIndex((p) => p.id === updatedPoV.id);
      if (index !== -1) {
        state.content[index] = updatedPoV;
      }
    },
    removePovLocal: (state, action: PayloadAction<string>) => {
      const povIdToDelete = action.payload;
      state.content = state.content.filter(
        (existingPoV) => existingPoV.id !== povIdToDelete,
      );
      state.totalElements -= 1;
      state.totalPages = Math.ceil(state.totalElements / state.size);
      state.number = Math.floor(state.totalElements / state.size) - 1;
      state.last = state.number === state.totalPages - 1;
      state.empty = state.totalElements === 0;
    },
    removeAllPoVsLocal: () => initialState,
  },
});

export const {
  setPovsLocal,
  addPoVLocal,
  editPoVLocal,
  removePovLocal,
  removeAllPoVsLocal,
} = povLocalSlice.actions;

export default povLocalSlice.reducer;
