import {
  deleteDocData,
  loadDocDataById,
  loadDocsData,
  saveDocData,
  setDocData,
} from "../firebase-firestore";

const docName = "povs";

export const savePoVFirebase = async (pov = {}) => {
  try {
    const { title, subtitle, points, owner } = pov;
    const povData = {
      title: title,
      subtitle: subtitle,
      points: points,
      owner: owner,
    };
    return await saveDocData(docName, "", povData);
  } catch (error) {
    throw error;
  }
};

export const getPoVsFirebase = async () => {
  try {
    return await loadDocsData(docName);
  } catch (error) {
    throw error;
  }
};

export const getPoVFirebase = async (povId) => {
  try {
    return await loadDocDataById(docName, povId);
  } catch (error) {
    throw error;
  }
};

// export const getPoVByOwnerFirebase = async (userId, povId) => {
//   try {
//     return await loadDocDataById(docName, userId, povId); // todo: match owner's pov
//   } catch (error) {
//     throw error;
//   }
// };

export const updatePoVFirebase = async (povId, pov) => {
  try {
    const { title, subtitle, points, owner } = pov;
    const povData = {
      title: title,
      subtitle: subtitle,
      points: points,
      owner: owner,
    };
    return await setDocData(docName, povId, "", povData);
  } catch (error) {
    throw error;
  }
};

export const deletePoVFirebase = async (povId) => {
  try {
    return await deleteDocData(docName, povId);
  } catch (error) {
    throw error;
  }
};
