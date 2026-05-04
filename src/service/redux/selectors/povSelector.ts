import { type RootState } from "../store";

export const selectPovs = (state: RootState) => state.povs.content;
export const selectPovsPage = (state: RootState) => state.povs;
export const selectPovById = (state: RootState, id: string) =>
  state.povs.content.find((p) => p.id === id);

export const selectMyPovs = (state: RootState) => state.myPovs.content;
export const selectMyPovsPage = (state: RootState) => state.myPovs;
export const selectMyPovById = (state: RootState, id: string) =>
  state.myPovs.content.find((p) => p.id === id); 

export const selectPovsLocal = (state: RootState) => state.povsLocal.content;
export const selectPovsLocalPage = (state: RootState) => state.povsLocal;
export const selectPovLocalById = (state: RootState, id: string) =>
  state.povsLocal.content.find((p) => p.id === id);
