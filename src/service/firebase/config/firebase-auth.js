import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAdditionalUserInfo,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseApp } from "./firebase-config";

const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();

/**
 * Sign in with Google Popup.
 */
export const signInWithGoogleAuth = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider)
    .then((result) => {
      const { isNewUser } = getAdditionalUserInfo(result);
      return { user: result.user, isNewUser };
    });
};

/**
 * Sign up with email/password and set profile.
 */
export const signUpUserWithEmailAndPassword = async (
  email,
  password,
  displayName,
  displayPicture
) => {
  return await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    return updateProfile(user, {
      displayName,
      photoURL: displayPicture,
    }).then(() => user);
  });
};

/**
 * Sign in with email/password.
 */
export const signInUserWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password).then((userCredential) => userCredential.user);
};

/**
 * Sign out.
 */
export const signOutFirebaseUser = async () => {
  return await signOut(auth);
};

/**
 * Check if user is signed in.
 */
export const isUserSignedIn = () => !!auth.currentUser;

/**
 * Subscribe to auth state changes.
 */
export const onAuthStateChangedFirebase = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe;
};

/**
 * Get current user.
 */
export const getCurrentUser = () => auth.currentUser;

/**
 * Update current user's profile.
 */
export const updateUserProfile = async (displayName, displayPicture) => {
  const user = auth.currentUser;
  if (!user) return Promise.reject(new Error("User not signed in"));

  return await updateProfile(user, {
    displayName,
    photoURL: displayPicture,
  }).then(() => user);
};

/**
 * Update current user's email.
 */
export const updateUserEmailFirebase = async (email) => {
  const user = auth.currentUser;
  if (!user) return Promise.reject(new Error("User not signed in"));

  return await updateEmail(user, email);
};

/**
 * Update current user's password.
 */
export const updateUserPasswordFirebase = async (password) => {
  const user = auth.currentUser;
  if (!user) return Promise.reject(new Error("User not signed in"));

  return await updatePassword(user, password);
};

/**
 * Reauthenticate current user.
 */
export const reauthenticateUserFirebase = async (currentPassword) => {
  const user = auth.currentUser;
  if (!user || !user.email)
    return Promise.reject(new Error("User not signed in or email missing"));

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  return await reauthenticateWithCredential(user, credential);
};

/**
 * Send email verification.
 */
export const sendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (!user) return Promise.reject(new Error("User not signed in"));

  return await sendEmailVerification(user);
};

/**
 * Send password reset email.
 */
export const sendResetPasswordEmail = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

/**
 * Delete user account.
 */
export const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (!user) return Promise.reject(new Error("User not signed in"));

  return await deleteUser(user);
};
