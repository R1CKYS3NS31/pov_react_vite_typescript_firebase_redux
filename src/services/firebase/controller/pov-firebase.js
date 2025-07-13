import {
  saveDocData,
  deleteDocData,
  loadDocDataById,
  loadDocsData,
  setDocData,
  loadDocsDataWhere,
} from "../config/firebase-firestore";

const docName = "povs";

export const savePoVFirebase = async (pov = {}) => {
  try {
    const { title, points, author } = pov;
    const povData = {
      title: title,
      // subtitle: subtitle,
      points: points,
      author: author,
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

export const getPoVsByAuthorFirebase = async (authorId) => {
  try {
    return await loadDocsDataWhere(docName, 12, {
      field: "author",
      value: authorId,
    });
  } catch (error) {
    throw error;
  }
};

export const getPoVFirebase = async (povId) => {
  try {
    return await loadDocDataById(docName, povId, "")
      .then((povSnapshot) => {
        return {
          id: povSnapshot.id,
          exists: povSnapshot.exists(),
          ...povSnapshot.data(),
        };
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const updatePoVFirebase = async (povId, pov) => {
  try {
    const { title, points, author } = pov;
    const povData = {
      title: title,
      // subtitle: subtitle,
      points: points,
      author: author,
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
