import {
  addDoc,
  collection,
  doc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "./firebase-config";

const firestore = getFirestore(firebaseApp);

export const saveDocData = async (docName, docData) => {
  try {
    return await addDoc(collection(firestore), docName, {
      ...docData,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    throw error;
  }
};

export const loadDocData = async (docName, limitNo = 12) => {
  try {
    const recentQuery = query(
      collection(firestore),
      docName,
      orderBy("timestamp", "desc"),
      limit(limitNo)
    );
    onSnapshot(recentQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "removed") {
          // delete doc
        } else {
          const docData = change.doc;
          return docData;
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

export const setDocData = async (docName, docData, otherData = {}) => {
  try {
    const docRef = doc(firestore, docName, docData);
    return await setDoc(docRef, { ...otherData, timestamp: serverTimestamp() });
  } catch (error) {
    throw error;
  }
};

export const updateDocData = async (docName, docData, otherData = {}) => {
  try {
    const docRef = await addDoc(firestore, docName, docData);
    return await updateDoc(docRef, { ...otherData });
  } catch (error) {
    throw error;
  }
};
