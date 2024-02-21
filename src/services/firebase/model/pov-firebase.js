import { saveDocData } from "../firebase-firestore";

const docName = "PoV";

export const savePovFirebase = async (pov = {}) => {
  try {
    return await saveDocData(docName, pov);
  } catch (error) {
    throw error;
  }
};
