import {
  GoogleAuthProvider,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { firebaseApp } from "./firebase-config";

const auth = getAuth(firebaseApp);

// Sign-in PoV in Firebase using popup auth and Google as the identity provider.
const signInWithGoogleAUth = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw error;
  }
};

// sign-out of PoV
const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Returns true if a user is signed-in.
const isUserSignedIn = () => {
  return !!auth.currentUser;
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
export const currentUser = () =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    } else {
      return null;
    }
  });

// const updateUserProfile = async () => {
//   await updateProfile(currentUser, {
//     displayName: "Jane Q. User",
//     photoURL: "https://example.com/jane-q-user/profile.jpg",
//   })
//     .then(() => {
//       // Profile updated!
//       // ...
//     })
//     .catch((error) => {
//       throw error;
//     });

//   await sendEmailVerification(currentUser)
//     .then(() => {
//       // Email verification sent!
//       // ...
//     })
//     .catch((error) => {
//       throw error;
//     });

//   await updateEmail(auth.currentUser, "user@example.com")
//     .then(() => {
//       // Email updated!
//       // ...
//     })
//     .catch((error) => {
//       // An error occurred
//       // ...
//     });

//   await sendPasswordResetEmail(auth, "user@example.com")
//     .then(() => {
//       // Password reset email sent!
//       // ..
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });

//   await updatePassword(currentUser, "xi9ws9qa")
//     .then(() => {
//       // Update successful.
//     })
//     .catch((error) => {
//       // An error ocurred
//       // ...
//       throw error;
//     });
// };

// const deleteUserProfile = async (user) => {
//   await deleteUser(user)
//     .then(() => {
//       // User deleted.
//     })
//     .catch((error) => {
//       // An error ocurred
//       // ...
//       throw error;
//     });
// };
