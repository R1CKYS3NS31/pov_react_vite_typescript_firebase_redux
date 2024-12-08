import {
  deleteDocData,
  loadDocDataById,
  loadDocsData,
  setDocData,
  updateDocData,
  saveDocData,
} from "../config/firebase-firestore";

const docName = "users";
export const saveUserFirebase = async (user = {}) => {
  try {
    const { name, email, photoUrl, isUser } = user;

    const userData = {
      name: {
        first: await name.first,
        last: await name.last,
      },
      email: email,
      // password: password,
      photoUrl: photoUrl,
      isUser: isUser || true,
    };
    return await saveDocData(docName, "", userData);
  } catch (error) {
    throw error;
  }
};

export const setUserFirebase = async (user = {}) => {
  try {
    const { uid, name, email, photoUrl, isUser } = user;

    const userData = {
      name: {
        first: await name.first,
        last: await name.last,
      },
      email: email,
      // password: password,
      photoUrl: photoUrl,
      isUser: isUser || true,
    };

    return await setDocData(docName, uid, "", userData);
  } catch (error) {
    throw error;
  }
};

export const getUsersFirebase = async () => {
  try {
    return await loadDocsData(docName);
  } catch (error) {
    throw error;
  }
};

export const getUserFirebase = async (userId) => {
  try {
    const userSnapShot = await loadDocDataById(docName, userId);
    return {
      ...userSnapShot.data(),
      exists: userSnapShot.exists(),
      uid: userId,
    };
  } catch (error) {
    throw error;
  }
};

export const updateUserFirebase = async (userId, user) => {
  try {
    const { firstName, lastName, email } = user;
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    return await updateDocData(docName, userId, "", userData);
  } catch (error) {
    throw error;
  }
};

export const deleteUserFirebase = async (userId) => {
  try {
    return await deleteDocData(docName, userId);
  } catch (error) {
    throw error;
  }
};
