import { loadDocsData, saveDocData } from "../firebase-firestore";

const docName = "povs";

export const savePoVFirebase = async (pov = {}) => {
  try {
    return await saveDocData(docName, pov);
  } catch (error) {
    throw error;
  }
};

export const getPoVsFirebase = async()=>{
  try {
    return await loadDocsData(docName)
  } catch (error) {
    throw error
  }
}