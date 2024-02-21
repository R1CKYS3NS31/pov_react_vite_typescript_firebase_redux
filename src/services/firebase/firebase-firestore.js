import {
  addDoc,
  collection,
  doc,
  getDoc,
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

export const loadDocsData = async (docName, limitNo = 12) => {
  try {
    const recentQuery = query(
      collection(firestore),
      docName,
      orderBy("timestamp", "desc"),
      limit(limitNo)
    );

    // return (await getDocs(recentQuery)) // or
    onSnapshot(recentQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "removed") {
          // deleted doc - delete local doc
        }
        const docData = change.doc;
        return docData;
      });
    });
  } catch (error) {
    throw error;
  }
};

export const loadDocDataById = async (docName, docId) => {
  try {
    if (!docId) return;
    const docRef = doc(collection(firestore), docName, docId);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot;
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
