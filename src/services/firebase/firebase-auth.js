import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Sign-in PoV in Firebase using popup auth and Google as the identity provider.
const signInWithGoogleAUth = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
};

// sign-out of PoV
const signOutUser = async () => {
  await signOut(getAuth());
};

// Returns true if a user is signed-in.
const isUserSignedIn = () => {
  return !!getAuth().currentUser;
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
const authStateObserver = async () => {
  onAuthStateChanged(getAuth, (user) => {
    if (user) {
      const usename = getAuth().currentUser.displayName;
      const profilePhotoUrl = getAuth().currentUser.photoURL;
      // perform other actions for is your exists
    }
  });
};
