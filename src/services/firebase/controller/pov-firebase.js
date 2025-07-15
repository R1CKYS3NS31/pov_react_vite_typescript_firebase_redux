import {
  saveDocData,
  deleteDocData,
  loadDocDataById,
  loadDocsData,
  setDocData,
  loadDocsDataWhere,
} from "../config/firebase-firestore";
import { getUserFirebase } from "./user-firebase";

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

// export const getPoVsFirebase = async () => {
//   try {
//     // console.log(await loadDocsData(docName));
//     return await loadDocsData(docName);
//   } catch (error) {
//     throw error;
//   }
// };

export const getPoVsFirebase = async () => {
  try {
    const povSnapshots = await loadDocsData(docName);

    const povsWithAuthors = await Promise.all(
      povSnapshots.docs.map((povData) => {
        return getUserFirebase(povData.author)
          .then((author) => ({
            id: povData.id,
            exists: true,
            ...povData,
            author,
          }))
          .catch((err) => {
            console.warn(`Failed to load author ${povData.author}:`, err);
            return {
              id: povData.id,
              exists: true,
              ...povData,
              author: null,
            };
          });
      })
    );

    return { ...povSnapshots, docs: povsWithAuthors };
  } catch (error) {
    throw error;
  }
};

// export const getPoVsByAuthorFirebase = async (authorId) => {
//   try {
//     return await loadDocsDataWhere(docName, 12, {
//       field: "author",
//       value: authorId,
//     });
//   } catch (error) {
//     throw error;
//   }
// };
export const getPoVsByAuthorFirebase = async (authorId) => {
  try {
    const povsByAuthorSnapshots = await loadDocsDataWhere(docName, 12, {
      field: "author",
      value: authorId,
    });
    const povsByAuthorWithAuthor = await Promise.all(
      povsByAuthorSnapshots.docs.map((povData) => {
        return getUserFirebase(povData.author)
          .then((author) => ({
            id: povData.id,
            exists: true,
            ...povData,
            author,
          }))
          .catch((err) => {
            console.warn(`Failed to load author ${povData.author}:`, err);
            return {
              id: povData.id,
              exists: true,
              ...povData,
              author: null,
            };
          });
      })
    );
    return {
      ...povsByAuthorSnapshots,
      docs: povsByAuthorWithAuthor,
    };
  } catch (error) {
    throw error;
  }
};

export const getPoVFirebase = async (povId) => {
  try {
    return await loadDocDataById(docName, povId, "")
      .then((povSnapshot) => {
        if (!povSnapshot.exists()) {
          return { exists: false, id: povId };
        }
        const povData = povSnapshot.data();

        return getUserFirebase(povData.author)
          .then((author) => ({
            id: povSnapshot.id,
            exists: true,
            ...povData,
            author,
          }))
          .catch((error) => {
            throw error;
          });
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

export const likePoVFirebase = async (povId, userId) => {
  try {
    const pov = await getPoVFirebase(povId);
    if (!pov.exists) throw new Error("PoV not found");

    const updatedLikes = Array.from(new Set([...(pov.likes || []), userId]));
    return await setDocData("povs", povId, "", { likes: updatedLikes });
  } catch (error) {
    throw error;
  }
};

export const unLikePoVFirebase = async (povId, userId) => {
  try {
    const pov = await getPoVFirebase(povId);
    if (!pov.exists) throw new Error("PoV not found");

    const updatedLikes = (pov.likes || []).filter((id) => id !== userId);
    return await setDocData("povs", povId, "", { likes: updatedLikes });
  } catch (error) {
    throw error;
  }
};

export const commentOnPoVFirebase = async (povId, userId, commentText) => {
  try {
    const pov = await getPoVFirebase(povId);
    if (!pov.exists) throw new Error("PoV not found");

    const newComment = {
      id: crypto.randomUUID(),
      postedBy: userId,
      text: commentText,
      timestamp: Date.now(),
    };

    const updatedComments = [...(pov.comments || []), newComment];
    return await setDocData("povs", povId, "", { comments: updatedComments });
  } catch (error) {
    throw error;
  }
};

export const uncommentPoVFirebase = async (povId, commentId) => {
  try {
    const pov = await getPoVFirebase(povId);
    if (!pov.exists) throw new Error("PoV not found");

    const updatedComments = (pov.comments || []).filter(
      (comment) => comment.id !== commentId
    );
    return await setDocData("povs", povId, "", { comments: updatedComments });
  } catch (error) {
    throw error;
  }
};
