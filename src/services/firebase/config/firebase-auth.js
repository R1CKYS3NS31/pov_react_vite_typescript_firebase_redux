import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateCurrentUser,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { firebaseApp } from "./firebase-config";

const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();

// Sign-in PoV in Firebase using popup auth and Google as the identity provider.
export const signInWithGoogleAUth = async () => {
  const provider = new GoogleAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    throw error;
  }
};

// sign-up
export const signUpUserWithEmailAndPassword = async (
  email,
  password,
  displayName,
  displayPicture
) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      // ...
      const user = userCredential.user;
      updateProfile(user, {
        displayName: displayName,
        displayPicture: displayPicture,
      }).catch((error) => {
        throw error;
      });
      return user;
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // ..
      throw error;
    });
};

// sign-in
export const signInUserWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // ...
      return userCredential.user;
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      throw error;
    });
};

// sign-out of PoV
export const signOutFirebaseUser = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Returns true if a user is signed-in.
export const isUserSignedIn = () => {
  return !!auth.currentUser;
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
export const currentUser = () => {
  return onAuthStateChanged(auth, (user) => {
    return user;
  });
};

export const updateUserProfile = async (first, last, displayPicture) => {
  if (currentUser) {
    return await updateProfile(auth.currentUser, {
      displayName: first + " " + last,
      displayPicture: displayPicture,
    })
      .then((value) => {
        // Profile updated!
        // ...
        return auth.currentUser;
      })
      .catch((error) => {
        // console.log(error);
        throw error;
      });
  } else {
    throw Error("please sign-in");
  }
};

const updateUserDetails = async (user = currentUser()) => {
  try {
    return await updateCurrentUser(auth, user);
  } catch (error) {
    throw error;
  }
};

const resetUserEmail = async (user) => {
  if (currentUser) {
    return await sendEmailVerification(currentUser)
      .then(async () => {
        // Email verification sent!
        // ...
        await updateEmail(currentUser, user.email)
          .then(() => {
            // Email updated!
            // ...
            return currentUser;
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        throw error;
      });
  } else {
    return Error("please sign-in");
  }
};

const resetUserPassword = async (user) => {
  if (currentUser) {
    return await sendEmailVerification(currentUser)
      .then(async () => {
        // Email verification sent!
        // ...
        return await sendPasswordResetEmail(auth, user.email)
          .then(async () => {
            // Password reset email sent!
            // ..
            return await updatePassword(currentUser, user.password)
              .then(() => {
                // Update successful.
                return currentUser;
              })
              .catch((error) => {
                // An error ocurred
                // ...
                throw error;
              });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        throw error;
      });
  } else throw Error("please sign-in");
};

const deleteUserProfile = async () => {
  if (currentUser) {
    await deleteUser(currentUser)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
        throw error;
      });
  } else {
    return Error("please sign-in");
  }
};
