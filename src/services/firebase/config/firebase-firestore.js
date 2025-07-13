import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseApp } from "./firebase-config";

const firestore = getFirestore(firebaseApp);

export const saveDocData = async (docName, pathSegment = "", docData) => {
  try {
    return await addDoc(collection(firestore, docName, pathSegment), {
      ...docData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
      .then((docRef) => {
        return {
          id: docRef.id,
          path: docRef.path,
        };
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const loadDocsData = async (docName, limitNo = 12, filters = {}) => {
  try {
    const recentQuery = query(
      collection(firestore, docName),
      orderBy("timestamp", "desc"),
      limit(limitNo)
    );
    // const filtersApplied = applyQueryFilters(recentQuery,filters)

    return await getDocs(recentQuery)
      .then((snapshot) => {
        return {
          size: snapshot.size,
          empty: snapshot.empty,
          docs: snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              exists: doc.exists(),
              ...doc.data(),
            };
          }),
        };
      })
      .catch((error) => {
        throw error;
      }); 
  } catch (error) {
    throw error;
  }
};

export const loadDocDataById = async (docName, path, pathSegment = "") => {
  try {
    const docRef = doc(collection(firestore, docName), path, pathSegment);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot;
  } catch (error) {
    throw error;
  }
};

export const loadDocsDataWhere = async (
  docName,
  limitNo = 12,
  filter = { field: "", value: "" }
) => {
  try {
    const recentQuery = query(
      collection(firestore, docName),
      orderBy("timestamp", "desc"),
      limit(limitNo),
      // filter && where(filter.field, "==", filter.value)
      where(filter.field, "==", filter.value)
    );

    return await getDocs(recentQuery)
      .then((snapshot) => {
        return {
          size: snapshot.size,
          empty: snapshot.empty,
          docs: snapshot.docs.flatMap((docSnapshot) => {
            return {
              id: docSnapshot.id,
              exists: docSnapshot.exists(),
              ...docSnapshot.data(),
            };
          }),
        };
      })
      .catch((error) => {
        throw error;
      }); // or
  } catch (error) {
    throw error;
  }
};

export const setDocData = async (
  docName,
  path,
  pathSegment = "",
  docData = {}
) => {
  try {
    const docRef = doc(collection(firestore, docName), path, pathSegment);
    return await setDoc(
      docRef,
      { ...docData, createdAt: new Date(), updatedAt: new Date() },
      { merge: true }
    )
      .then((value) => {
        return value;
      })
      .catch((error) => {
        throw error;
      });
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
    const docRef = doc(
      collection(firestore, docName),
      path,
      (pathSegment = "")
    );
    return await updateDoc(docRef, { ...docData, updatedAt: new Date() })
      .then((value) => {
        return value;
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const deleteDocData = async (docName, path, pathSegment = "") => {
  try {
    const docRef = doc(collection(firestore, docName), path, pathSegment);
    return await deleteDoc(docRef)
      .then((value) => {
        return value;
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
