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
import { saveUserFirebase } from "./model/user-firebase";

const auth = getAuth(firebaseApp);

// Sign-in PoV in Firebase using popup auth and Google as the identity provider.
export const signInWithGoogleAUth = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw error;
  }
};

// sign-out of PoV
export const signOutFirebaseUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Returns true if a user is signed-in.
export const isUserSignedIn = () => {
  return !!auth.currentUser;
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
const currentUser = () => {
  onAuthStateChanged(auth, (user) => {
    return user;
  });
};
export const saveUserAccount = async () => {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { firstN, lastN } = user.displayName.split(" ");
        const signedInUser = {
          name: {
            first: firstN,
            last: lastN,
          },
          email: user.email,
        };
        await saveUserFirebase((user = signedInUser));
        return user;
      } else return null;
    });
  } catch (error) {
    throw error;
  }
};

const updateUserProfile = async (user) => {
  if (currentUser) {
    await updateProfile(currentUser(), {
      displayName: user.name.first + " " + user.name.last,
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        throw error;
      });

    await sendEmailVerification(currentUser)
      .then(async () => {
        // Email verification sent!
        // ...
        await updateEmail(currentUser, user.email)
          .then(() => {
            // Email updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        throw error;
      });

    await sendPasswordResetEmail(auth, "user@example.com")
      .then(async () => {
        // Password reset email sent!
        // ..
        await updatePassword(currentUser, "xi9ws9qa")
          .then(() => {
            // Update successful.
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
  }
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
  }
};
