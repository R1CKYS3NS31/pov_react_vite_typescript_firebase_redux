import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  orderBy,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { firebaseApp } from "./firebase-config";


const firestore = getFirestore(firebaseApp);

/**
 * Recursively converts Firestore Timestamp instances to plain ISO strings.
 * Uses instanceof (not duck-typing) for reliable, type-safe detection.
 */
const toPlain = (value) => {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(toPlain);
  if (value !== null && typeof value === "object")
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toPlain(v)]));
  return value;
};

/**
 * Firestore data converter applied to every collection reference.
 *
 * fromFirestore — called automatically by the SDK on every document read.
 *   Attaches id/exists and converts all Timestamps to ISO strings so the
 *   returned objects are always Redux-safe plain values.
 *
 * toFirestore — passes write data through unchanged; timestamps are written
 *   via serverTimestamp() at the call site.
 */
const firestoreConverter = {
  toFirestore: (data) => data,
  fromFirestore: (snapshot) => ({
    id: snapshot.id,
    exists: snapshot.exists(),
    ...toPlain(snapshot.data()),
    _snapshot: snapshot, // Keep snapshot for cursor pagination
  }),
};

/** Returns a collection reference with the converter pre-attached. */
const getCol = (name) => collection(firestore, name).withConverter(firestoreConverter);

/**
 * Save data to a collection.
 */
export const saveDocData = async (
  collectionName,
  pathSegment = "",
  docData,
) => {
  const colRef = pathSegment
    ? collection(firestore, collectionName, pathSegment)
    : collection(firestore, collectionName);

  return await addDoc(colRef, {
    ...docData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
    .then((docRef) => ({
      id: docRef.id,
      path: docRef.path,
    }))
    .catch((error) => {
      throw error;
    });
};

/**
 * Load documents from a collection using cursor pagination.
 */
export const loadDocsData = async (collectionName, size = 12, sortBy = "createdAt", sortDirection = "desc", lastVisible = null) => {
  const colRef = getCol(collectionName);
  
  const queryConstraints = [orderBy(sortBy, sortDirection), limit(size)];
  if (lastVisible) {
    queryConstraints.push(startAfter(lastVisible));
  }
  
  const q = query(colRef, ...queryConstraints);

  return await getDocs(q)
    .then((snapshot) => {
      const docs = snapshot.docs;
      const lastDoc = docs[docs.length - 1];

      return {
        size: docs.length,
        empty: docs.length === 0,
        content: docs.map((d) => d.data()),
        lastVisible: lastDoc,
        last: docs.length < size,
      };
    })
    .catch((error) => {
      throw error;
    });
};


/**
 * Load a single document by ID.
 */
export const loadDocDataById = async (
  collectionName,
  docId,
  ...pathSegments
) => {
  // Attach the converter directly to the document reference so the SDK
  // serializes Timestamps and attaches id/exists automatically on read.
  const docRef = doc(firestore, collectionName, docId, ...pathSegments)
    .withConverter(firestoreConverter);

  return await getDoc(docRef)
    .then((snap) =>
      snap.exists()
        ? snap.data()                          // converter already applied
        : { id: snap.id, exists: false }        // doc not found
    )
    .catch((error) => {
      throw error;
    });
};

/**
 * Load documents with a simple WHERE filter using cursor pagination.
 */
export const loadDocsDataWhere = async (
  collectionName,
  size = 12,
  filters = [],
  sortBy = "createdAt",
  sortDirection = "desc",
  lastVisible = null,
) => {
  const colRef = getCol(collectionName);
  const filterConstraints = filters.map(({ field, operator, value }) => where(field, operator, value));
  
  const queryConstraints = [...filterConstraints, orderBy(sortBy, sortDirection), limit(size)];
  if (lastVisible) {
    queryConstraints.push(startAfter(lastVisible));
  }

  const q = query(colRef, ...queryConstraints);

  return await getDocs(q)
    .then((snapshot) => {
      const docs = snapshot.docs;
      const lastDoc = docs[docs.length - 1];

      return {
        size: docs.length,
        empty: docs.length === 0,
        content: docs.map((d) => d.data()),
        lastVisible: lastDoc,
        last: docs.length < size,
      };
    })
    .catch((error) => {
      throw error;
    });
};


/**
 * Set (overwrite/merge) a document by ID.
 */
export const setDocData = async (
  collectionName,
  docId,
  docData = {},
  ...pathSegments
) => {
  const docRef = doc(firestore, collectionName, docId, ...pathSegments);

  return await setDoc(
    docRef,
    {
      ...docData,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
    .then(() => ({
      id: docId,
      success: true,
    }))
    .catch((error) => {
      throw error;
    });
};

/**
 * Update a document by ID.
 */
export const updateDocData = async (
  collectionName,
  docId,
  docData = {},
  ...pathSegments
) => {
  const docRef = doc(firestore, collectionName, docId, ...pathSegments);

  return await updateDoc(docRef, {
    ...docData,
    updatedAt: serverTimestamp(),
  })
    .then(() => ({
      id: docId,
      success: true,
    }))
    .catch((error) => {
      throw error;
    });
};

/**
 * Delete a document by ID.
 */
export const deleteDocData = async (collectionName, docId, ...pathSegments) => {
  const docRef = doc(firestore, collectionName, docId, ...pathSegments);

  return await deleteDoc(docRef)
    .then(() => ({
      id: docId,
      success: true,
    }))
    .catch((error) => {
      throw error;
    });
};

/**
 * Get total count of documents in a collection.
 */
export const getDocsCount = async (collectionName) => {
  const colRef = collection(firestore, collectionName);
  const snapshot = await getCountFromServer(colRef);
  return snapshot.data().count;
};

