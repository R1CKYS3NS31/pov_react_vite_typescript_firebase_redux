import {
  deleteDocData,
  loadDocDataById,
  loadDocsData,
  saveDocData,
  updateDocData,
} from "../firebase-firestore";

const docName = "users";
export const saveUserFirebase = async (user = {}) => {
  try {
    const { firstName, lastName, email, password } = user;
    const userData = {
      name: {
        first: firstName,
        last: lastName,
      },
      email: email,
      password: password,
    };
    return await saveDocData(docName, "", userData);
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
    return await loadDocDataById(docName, userId);
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
