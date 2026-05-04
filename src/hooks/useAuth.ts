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
import type { User as FirebaseUser } from "firebase/auth";
import type { User } from "../models/user.model";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const notificationHandler = useNotificationHandler();
  const { notification, notify, closeNotification, handleApiError } =
    notificationHandler;

  useEffect(() => {
    const unsubscribe = onAuthStateChangedFirebase((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isAuthenticated = !!user;

  const handleSignUp = useCallback(
    async (userData: any) => {
      const { email, password, name, description } = userData;
      const displayName = `${name?.first || ""} ${name?.last || ""}`.trim();
      setAuthLoading(true);
      try {
        const firebaseUser = await signUpUserWithEmailAndPassword(
          email,
          password,
          displayName,
          "",
        );
        
        const userFirestore = await setUserFirebase({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName || displayName,
          displayPicture: firebaseUser.photoURL || "",
          name: {
            first: name?.first || firebaseUser.displayName?.split(" ")[0] || "",
            last:
              name?.last ||
              firebaseUser.displayName?.split(" ").slice(1).join(" ") ||
              "",
          },
          description: description || "",
        });

        dispatch(setUserAccount(userFirestore));
        notify("Account created and signed in successfully!", "success");
        return userFirestore;
      } catch (error) {
        handleApiError(error);
        throw error;
      } finally {
        setAuthLoading(false);
      }
    },
    [notify, handleApiError, dispatch],
  );

  const handleSignIn = useCallback(
    async (email: string, password: string) => {
      setAuthLoading(true);
      try {
        const firebaseUser = await signInUserWithEmailAndPassword(email, password);
        const userFirestore = await getUserFirebase(firebaseUser.uid);
        dispatch(setUserAccount(userFirestore));
        notify("Signed in successfully!", "success");
        return userFirestore;
      } catch (error) {
        handleApiError(error);
        throw error;
      } finally {
        setAuthLoading(false);
      }
    },
    [notify, handleApiError, dispatch],
  );

  const handleGoogleSignIn = useCallback(async () => {
    setAuthLoading(true);
    try {
      const { user: firebaseUser, isNewUser } = await signInWithGoogleAuth();
      if (isNewUser) {
        const userFirestore = await setUserFirebase({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName || "",
          displayPicture: firebaseUser.photoURL || "",
          name: {
            first: firebaseUser.displayName?.split(" ")[0] || "",
            last: firebaseUser.displayName?.split(" ").slice(1).join(" ") || "",
          },
          description: "",
        });
        dispatch(setUserAccount(userFirestore));
        notify("Account created and signed in successfully!", "success");
        return userFirestore;
      }
      
      const userFirestore = await getUserFirebase(firebaseUser.uid);
      dispatch(setUserAccount(userFirestore));
      notify("Signed in successfully!", "success");
      return userFirestore;
    } catch (error) {
      handleApiError(error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }, [notify, handleApiError, dispatch]);

  const handleSignOut = useCallback(async () => {
    setAuthLoading(true);
    try {
      await signOutFirebaseUser();
      notify("User account signed out successfully!", "success");
    } catch (error) {
      handleApiError(error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }, [notify, handleApiError]);

  const handleUpdatePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      setAuthLoading(true);
      try {
        await reauthenticateUserFirebase(currentPassword);
        await updateUserPasswordFirebase(newPassword);
        notify("Password updated successfully!", "success");
      } catch (error) {
        handleApiError(error);
        throw error;
      } finally {
        setAuthLoading(false);
      }
    },
    [notify, handleApiError],
  );

  return {
    account: user as any as User | null, // Casting to User model for UI consistency, handle with caution
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
