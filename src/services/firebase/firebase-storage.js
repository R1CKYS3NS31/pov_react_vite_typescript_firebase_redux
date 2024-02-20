import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "./firebase-config";

const storage = getStorage(firebaseApp);

// filePath = .../${file.name}
export const saveFile = async (file, filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    const fileSnapshot = await uploadBytesResumable(fileRef, file);
    const downloadUrl = await getDownloadURL(fileSnapshot);

    return {
      downloadUrl: downloadUrl,
      storageUri: fileSnapshot.metadata.fullPath,
    };
  } catch (error) {
    throw error;
  }
};
