import {
  addDoc,
  collection,
  deleteDoc,
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

export const saveDocData = async (docName, pathSegment, docData) => {
  try {
    return await addDoc(collection(firestore, docName, pathSegment), {
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

export const loadDocDataById = async (docName, path, pathSegment) => {
  try {
    const docRef = doc(collection(firestore, docName), path, pathSegment);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot;
  } catch (error) {
    throw error;
  }
};

export const setDocData = async (docName, path, pathSegment, docData = {}) => {
  try {
    const docRef = doc(collection(firestore, docName), path, pathSegment);
    return await setDoc(docRef, { ...docData, timestamp: serverTimestamp() });
  } catch (error) {
    throw error;
  }
};

export const updateDocData = async (
  docName,
  path,
  pathSegment,
  docData = {}
) => {
  try {
    const docRef = doc(collection(firestore, docName), path, pathSegment);
    return await updateDoc(docRef, { ...docData });
  } catch (error) {
    throw error;
  }
};

export const deleteDocData = async (docName, path, pathSegment) => {
  try {
    const docRef = doc(collection(firestore, docName), path, pathSegment);
    return await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};
