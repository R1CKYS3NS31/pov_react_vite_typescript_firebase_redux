export const selectPovs = (state) => state.povs.content;
export const selectPovsPage = (state) => state.povs;
export const selectPovById = (state, id) =>
  state.povs.content.find((p) => p.id === id);

export const selectMyPovs = (state) => state.myPovs.content;
export const selectMyPovsPage = (state) => state.myPovs;
export const selectMyPovById = (state, id) =>
  state.myPovs.content.find((p) => p.id === id); 

export const selectPovsLocal = (state) => state.povsLocal.content;
export const selectPovsLocalPage = (state) => state.povsLocal;
export const selectPovLocalById = (state, id) =>
  state.povsLocal.content.find((p) => p.id === id);
