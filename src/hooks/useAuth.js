import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNotificationHandler } from "./useNotificationHandler";
import {
  signInUserWithEmailAndPassword,
  signUpUserWithEmailAndPassword,
  signInWithGoogleAuth,
  signOutFirebaseUser,
  reauthenticateUserFirebase,
  updateUserPasswordFirebase,
  onAuthStateChangedFirebase,
} from "../service/firebase/config/firebase-auth";
import {
  getUserFirebase,
  setUserFirebase,
} from "../service/firebase/controller/user-firebase";
import { setUserAccount } from "../service/redux/slices/user/userAccountSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const notificationHandler = useNotificationHandler();
  const { notification, notify, closeNotification, handleApiError } =
    notificationHandler;

  // const isAuthenticated = useCallback(() => !!isUserSignedIn(), []);
  useEffect(() => {
    const unsubscribe = onAuthStateChangedFirebase((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isAuthenticated = !!user;

  const handleSignUp = useCallback(
    async (userData) => {
      const { email, password, name, description } = userData;
      const displayName = `${name?.first || ""} ${name?.last || ""}`.trim();
      setAuthLoading(true);
      return await signUpUserWithEmailAndPassword(
        email,
        password,
        displayName,
        "",
      )
        .then(async (user) => {
          // save user in firestore database when created
          await setUserFirebase({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            displayPicture: user.displayPicture,
            name: {
              first: name?.first || user.displayName?.split(" ")[0] || "",
              last:
                name?.last ||
                user.displayName?.split(" ").slice(1).join(" ") ||
                "",
            },
            description: description || "",
          })
            .then((userFirestore) => {
              dispatch(setUserAccount(userFirestore));
              notify("Account created and signed in successfully!", "success");
              return userFirestore;
            })
            .catch(handleApiError)
            .finally(() => setAuthLoading(false));
        })
        .catch(handleApiError)
        .finally(() => setAuthLoading(false));
    },
    [notify, handleApiError, dispatch],
  );

  const handleSignIn = useCallback(
    (email, password) => {
      setAuthLoading(true);
      return signInUserWithEmailAndPassword(email, password)
        .then((user) => {
          // fetch user from firestore
          getUserFirebase(user.uid)
            .then((userFirestore) => {
              dispatch(setUserAccount(userFirestore));
              notify("Signed in successfully!", "success");
              return userFirestore;
            })
            .catch(handleApiError)
            .finally(() => setAuthLoading(false));
        })
        .catch(handleApiError)
        .finally(() => setAuthLoading(false));
    },
    [notify, handleApiError, dispatch],
  );

  const handleGoogleSignIn = useCallback(() => {
    // r1cky_s3ns31 has bugs
    setAuthLoading(true);
    return signInWithGoogleAuth()
      .then(async ({ user, isNewUser }) => {
        // save user in firestore database when created
        if (isNewUser) {
          await setUserFirebase({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            displayPicture: user.displayPicture,
            name: {
              first: user.displayName?.split(" ")[0] || "",
              last: user.displayName?.split(" ").slice(1).join(" ") || "",
            },
            description: "",
          })
            .then((userFirestore) => {
              notify("Account created and signed in successfully!", "success");
              return userFirestore;
            })
            .catch(handleApiError)
            .finally(() => setAuthLoading(false));
        }
        notify("Signed in successfully!", "success");
        return user;
      })
      .catch(handleApiError)
      .finally(() => setAuthLoading(false));
  }, [notify, handleApiError]);

  const handleSignOut = useCallback(() => {
    setAuthLoading(true);
    return signOutFirebaseUser()
      .then(() => {
        notify("User account signed out successfully!", "success");
      })
      .catch(handleApiError)
      .finally(() => setAuthLoading(false));
  }, [notify, handleApiError]);

  const handleUpdatePassword = useCallback(
    // r1cky_s3ns31 has bugs
    async (currentPassword, newPassword) => {
      setAuthLoading(true);
      return await reauthenticateUserFirebase(currentPassword)
        .then(async () => await updateUserPasswordFirebase(newPassword))
        .then(() => {
          notify("Password updated successfully!", "success");
        })
        .catch((error) => {
          handleApiError(error);
          throw error;
        })
        .finally(() => setAuthLoading(false));
    },
    [notify, handleApiError],
  );

  return {
    account: user,
    loading: loading || authLoading,
    isAuthenticated: isAuthenticated,
    notification,
    closeNotification,
    handleSignUp,
    handleSignIn,
    handleGoogleSignIn,
    handleSignOut,
    handleUpdatePassword,
  };
};
